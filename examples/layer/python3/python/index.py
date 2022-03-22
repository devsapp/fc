import logging
import dataclasses

def handler(event, context):
  logger = logging.getLogger()
  logger.info('hello world')
  return 'hello world'