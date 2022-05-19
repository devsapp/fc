resource "random_id" "this" {
  byte_length = 8
}
locals {
  default_description  = "Auto created by serverless devs with terraform"
  default_name_prefix  = var.namePrefix == "" ? "serverless-devs" : var.namePrefix
  default_name_suffix  = random_id.this.hex
  default_name         = "${local.default_name_prefix}-${local.default_name_suffix}"
  default_vpc_cdir     = "192.168.0.0/16"
  default_vswitch_cdir = "192.168.1.0/24"
}

resource "alicloud_vpc" "vpc" {
  vpc_name    = local.default_name
  cidr_block  = local.default_vpc_cdir
  description = local.default_description
}
data "alicloud_fc_zones" "fc-zone" {}

resource "alicloud_vswitch" "vsw" {
  vpc_id       = alicloud_vpc.vpc.id
  vswitch_name = local.default_name
  cidr_block   = local.default_vswitch_cdir
  zone_id      = data.alicloud_fc_zones.fc-zone.ids.0
  description  = local.default_description
}

locals {
  ingress_with_cidr_blocks = [
    {
      from_port  = -1
      to_port    = -1
      protocol   = "all"
      cidr_block = "192.168.0.0/16"
      priority   = 100
    },
    {
      from_port  = -1
      to_port    = -1
      protocol   = "icmp"
      cidr_block = "0.0.0.0/0"
      priority   = 100
    },
    {
      from_port  = 443
      to_port    = 443
      protocol   = "tcp"
      cidr_block = "0.0.0.0/0"
      priority   = 100
    },
    {
      from_port  = 80
      to_port    = 80
      protocol   = "tcp"
      cidr_block = "0.0.0.0/0"
      priority   = 100
    },
  ]
}

resource "alicloud_security_group_rule" "sg_rule" {
  count             = length(local.ingress_with_cidr_blocks)
  security_group_id = alicloud_security_group.sg.id

  type        = "ingress"
  ip_protocol = local.ingress_with_cidr_blocks[count.index].protocol
  nic_type    = "intranet"
  port_range  = "${local.ingress_with_cidr_blocks[count.index].from_port}/${local.ingress_with_cidr_blocks[count.index].to_port}"
  cidr_ip     = local.ingress_with_cidr_blocks[count.index].cidr_block
  priority    = local.ingress_with_cidr_blocks[count.index].priority
  description = local.default_description
}

resource "alicloud_security_group" "sg" {
  name        = local.default_name
  description = local.default_description
  vpc_id      = alicloud_vpc.vpc.id
}

resource "alicloud_log_project" "project" {
  count       = var.createLog ? 1 : 0
  name        = local.default_name
  description = local.default_description
}

resource "alicloud_log_store" "store" {
  count                 = var.createLog ? 1 : 0
  project               = alicloud_log_project.project.0.name
  name                  = local.default_name
  shard_count           = 3
  auto_split            = true
  max_split_shard_count = 60
  append_meta           = true
}

resource "alicloud_oss_bucket" "bucket" {
  count           = var.createBucket ? 1 : 0
  bucket          = local.default_name
  acl             = "private"
  storage_class   = "Standard"
  redundancy_type = "LRS"
}

resource "alicloud_nas_file_system" "nas_fs" {
  count         = var.createNas ? 1 : 0
  protocol_type = "NFS"
  storage_type  = "Capacity"
}

resource "alicloud_nas_access_group" "nas_ag" {
  count = var.createNas ? 1 : 0
  name  = local.default_name
  type  = "Vpc"
}

resource "alicloud_nas_mount_target" "nas_mt" {
  count             = var.createNas ? 1 : 0
  file_system_id    = alicloud_nas_file_system.nas_fs.0.id
  access_group_name = alicloud_nas_access_group.nas_ag.0.name
  vswitch_id        = alicloud_vswitch.vsw.id
  security_group_id = alicloud_security_group.sg.id
}


variable "namePrefix" {
  default = ""
  type    = string
}

variable "createLog" {
  default = true
  type    = bool
}

variable "createBucket" {
  default = true
  type    = bool
}

variable "createNas" {
  default = true
  type    = bool
}

output "vpcId" {
  value = alicloud_vpc.vpc.id
}

output "vswitchId" {
  value = alicloud_vswitch.vsw.id
}

output "securityGroupId" {
  value = alicloud_security_group.sg.id
}

output "nasId" {
  value = var.createNas ? alicloud_nas_file_system.nas_fs.0.id : null
}

output "nasMountTargetId" {
  value = var.createNas ? replace(alicloud_nas_mount_target.nas_mt.0.id, "${alicloud_nas_file_system.nas_fs.0.id}:", "") : null
}

output "slsProject" {
  value = var.createLog ? alicloud_log_project.project.0.name : null
}

output "slsLogStore" {
  value = var.createLog ? alicloud_log_store.store.0.name : null
}

output "ossBucketName" {
  value = var.createBucket ? alicloud_oss_bucket.bucket.0.bucket : null
}

output "ossExtranetEndpoint" {
  value = var.createBucket ? alicloud_oss_bucket.bucket.0.extranet_endpoint : null
}

output "ossIntranetEndpoint" {
  value = var.createBucket ? alicloud_oss_bucket.bucket.0.intranet_endpoint : null
}