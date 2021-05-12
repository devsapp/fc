'use strict'
const FC = require('@alicloud/fc2')

export class Info {
  private fcClient: any;
  private region: any;

  constructor(credentials, region) {
    this.region = region
    this.fcClient = new FC(credentials.AccountID, {
      accessKeyID: credentials.AccessKeyID,
      accessKeySecret: credentials.AccessKeySecret,
      securityToken: credentials.stsToken,
      region: region,
      timeout: 6000000
    })
  }

  async info(serviceName, functionName) {
    if (!serviceName) {
      throw new Error('ServiceName does not exist.')
    }

    const findFunction = () => {
      if (!functionName) {
        throw new Error('FunctionName does not exist.')
      }
    }

    const pro = {
      region: this.region,
      service: {},
      function: {},
      triggers: {}
    }

    pro.service = await this.syncService(serviceName, pro.service)
    pro.service['tags'] = await this.syncTags(`services/${serviceName}`)
    findFunction()
    pro.function = await this.syncFunction(serviceName, functionName)
    pro.triggers = await this.syncTrigger(serviceName, functionName)
    return JSON.parse(JSON.stringify(pro))
  }

  async syncService(serviceName, service) {
    const {data} = await this.fcClient.getService(serviceName)
    const {description, role, logConfig, vpcConfig, nasConfig, internetAccess} = data
    const serviceData = {
      name: serviceName,
      internetAccess: internetAccess,
      tags: service.tags,
    }

    if (role) {
      serviceData['role'] = role
    }

    if (role) {
      serviceData['description'] = description
    }

    if (vpcConfig && vpcConfig.vpcId) {
      serviceData['vpcConfig'] = {
        securityGroupId: vpcConfig.securityGroupId,
        vswitchIds: vpcConfig.vSwitchIds,
        vpcId: vpcConfig.vpcId
      }
    }
    if (nasConfig && nasConfig.mountPoints.length > 0) {
      const nas = service.nasConfig

      const handlerDir = ({serverAddr, mountDir}) => {
        const subscript = serverAddr.indexOf(':/')
        const itemConfig = {
          serverAddr: serverAddr.substr(0, subscript),
          nasDir: serverAddr.substr(subscript + 1),
          fcDir: mountDir,
          LocalDir: undefined
        }
        if (!nas || nas === 'Auto') {
          return itemConfig
        }
        if (nas.Type === 'Auto') {
          if (!nas.FcDir || nas.FcDir === itemConfig.fcDir) {
            itemConfig.LocalDir = nas.LocalDir
          }
          return itemConfig
        }
        (nas.MountPoints || []).forEach(item => {
          if (`${item.NasAddr}:${item.NasDir}` === serverAddr && mountDir === item.FcDir) {
            itemConfig.LocalDir = item.LocalDir
          }
        })
        return itemConfig
      }

      serviceData['nasConfig'] = {
        userId: nasConfig.userId,
        groupId: nasConfig.groupId,
        mountPoints: nasConfig.mountPoints.map(item => handlerDir(item))
      }
    }

    if (logConfig && logConfig.logstore) {
      serviceData['logConfig'] = {
        logStore: logConfig.logstore,
        project: logConfig.project
      }
    }
    return serviceData
  }

  async syncTags(resourceArn) {
    const {data} = await this.fcClient.getResourceTags({resourceArn})
    const {tags = {}} = data || {}
    const t = Object.keys(tags).map(key => ({
      key: tags[key]
    }))
    if (t.length === 0) {
      return undefined
    }
    return t
  }

  async syncFunction(serviceName, functionName) {
    const {data} = await this.fcClient.getFunction(serviceName, functionName)
    const {
      description,
      runtime,
      handler,
      timeout,
      initializer,
      initializationTimeout,
      memorySize,
      environmentVariables,
      instanceConcurrency,
      customContainerConfig,
      caPort,
      instanceType
    } = data

    let customContainer
    if (customContainerConfig) {
      customContainer = {
        image: customContainerConfig.image,
        command: customContainerConfig.command,
        rrgs: customContainerConfig.args
      }
    }

    const functionConfig = {
      name: functionName,
      runtime: runtime,
      handler: handler,
      timeout: timeout,
      instanceType: instanceType,
      memorySize: memorySize,
    }

    if (description) {
      functionConfig['description'] = description
    }
    if (initializer) {
      functionConfig['initializer'] = initializer
    }
    if (initializationTimeout) {
      functionConfig['initializationTimeout'] = initializationTimeout
    }
    if (instanceConcurrency) {
      functionConfig['instanceConcurrency'] = instanceConcurrency
    }
    if (customContainer) {
      functionConfig['customContainer'] = customContainer
    }
    if (caPort) {
      functionConfig['caPort'] = caPort
    }
    const environment = Object.keys(environmentVariables).map(key => ({
      key: environmentVariables[key]
    }))

    if (environment) {
      functionConfig['environment'] = environment
    }
    return functionConfig
  }

  async syncTrigger(serviceName, functionName) {
    const {data} = await this.fcClient.listTriggers(serviceName, functionName)
    const {triggers = []} = data || {}
    if (triggers.length === 0) {
      return undefined
    }
    return triggers.map(item => {
      const {triggerConfig = {}, qualifier, triggerType, sourceArn, invocationRole} = item
      let type = triggerType.toLocaleLowerCase()
      let parameters = {}
      switch (type) {
        case 'http':
          parameters = {
            qualifier: qualifier,
            authType: triggerConfig.authType,
            methods: triggerConfig.methods
          }
          type = 'HTTP'
          break
        case 'oss':
          parameters = {
            qualifier: qualifier,
            bucketName: sourceArn.split(':').pop(),
            events: triggerConfig.events,
            filter: {
              Key: {
                Prefix: triggerConfig.filter.key.prefix,
                Suffix: triggerConfig.filter.key.suffix
              }
            }
          }
          type = 'OSS'
          break
        case 'timer':
          type = 'Timer'
          parameters = {
            qualifier: qualifier,
            cronExpression: triggerConfig.cronExpression,
            enable: triggerConfig.enable,
            payload: triggerConfig.payload
          }
          break
        case 'cdn_events':
          type = 'CDN'
          parameters = {
            qualifier: qualifier,
            eventName: triggerConfig.eventName,
            eventVersion: triggerConfig.eventVersion,
            notes: triggerConfig.notes,
            filter: {
              domain: triggerConfig.filter.domain
            },
          }
          break
        case 'log':
          type = 'Log'
          parameters = {
            qualifier: qualifier,
            sourceConfig: {
              logStore: triggerConfig.sourceConfig.logstore
            },
            jobConfig: {
              maxRetryTime: triggerConfig.jobConfig.maxRetryTime,
              triggerInterval: triggerConfig.jobConfig.triggerInterval
            },
            logConfig: {
              logStore: triggerConfig.logConfig.logstore,
              project: triggerConfig.logConfig.project
            },
            functionParameter: triggerConfig.functionParameter,
            enable: triggerConfig.enable,
          }
          break
        case 'mns_topic': {
          const arnConfig = sourceArn.split(':')
          type = 'MNSTopic'
          parameters = {
            qualifier: qualifier,
            filterTag: triggerConfig.filterTag,
            notifyStrategy: triggerConfig.notifyStrategy,
            notifyContentFormat: triggerConfig.notifyContentFormat,
            region: arnConfig[2],
            topicName: arnConfig.pop().split('/').pop()
          }
          break
        }
        case 'tablestore': {
          const arnOtsConfig = sourceArn.split(':').pop().split('/')
          type = 'TableStore'
          parameters = {
            qualifier: qualifier,
            tableName: arnOtsConfig[3],
            instanceName: arnOtsConfig[1]
          }
          break
        }
      }
      const triggerData = {
        name: item.triggerName,
        type: type,
        config: parameters,
      }
      if (invocationRole) {
        triggerData['role'] = invocationRole
      }
      return triggerData
    })
  }
}
