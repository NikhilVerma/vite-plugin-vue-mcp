import type { ZodRawShape, ZodTypeAny } from 'zod'
import type { VueMcpContext } from './types'
import { nanoid } from 'nanoid'
import { z } from 'zod'

export const mcpServerTools = [{
  name: 'get-component-tree',
  description: 'Get the Vue component tree in markdown tree syntax format.',
  params: {},
  handler: (ctx: VueMcpContext) => {
    return async () => {
      return new Promise((resolve) => {
        const eventName = nanoid()
        ctx.hooks.hookOnce(eventName, (res) => {
          resolve({
            content: [{
              type: 'text',
              text: JSON.stringify(res),
            }],
          })
        })
        ctx.rpcServer.getInspectorTree({ event: eventName })
      })
    }
  },
}, {
  name: 'get-component-state',
  description: 'Get the Vue component state in JSON structure format.',
  params: {
    componentName: z.string(),
  },
  handler: (ctx: VueMcpContext) => {
    return async ({ componentName }: { componentName: string }) => {
      return new Promise((resolve) => {
        const eventName = nanoid()
        ctx.hooks.hookOnce(eventName, (res) => {
          resolve({
            content: [{
              type: 'text',
              text: JSON.stringify(res),
            }],
          })
        })
        ctx.rpcServer.getInspectorState({ event: eventName, componentName })
      })
    }
  },
}, {
  name: 'edit-component-state',
  description: 'Edit the Vue component state.',
  params: {
    componentName: z.string(),
    path: z.array(z.string()),
    value: z.string(),
    valueType: z.enum(['string', 'number', 'boolean', 'object', 'array']),
  },
  handler: (ctx: VueMcpContext) => {
    return async ({ componentName, path, value, valueType }: { componentName: string, path: string[], value: string, valueType: string }) => {
      return new Promise((resolve) => {
        ctx.rpcServer.editComponentState({ componentName, path, value, valueType })
        resolve({
          content: [{
            type: 'text',
            text: 'ok',
          }],
        })
      })
    }
  },
}, {
  name: 'highlight-component',
  description: 'Highlight the Vue component.',
  params: {
    componentName: z.string(),
  },
  handler: (ctx: VueMcpContext) => {
    return async ({ componentName }: { componentName: string }) => {
      return new Promise((resolve) => {
        ctx.rpcServer.highlightComponent({ componentName })
        resolve({
          content: [{
            type: 'text',
            text: 'ok',
          }],
        })
      })
    }
  },
}, {
  name: 'get-router-info',
  description: 'Get the Vue router info in JSON structure format.',
  params: {},
  handler: (ctx: VueMcpContext) => {
    return async () => {
      return new Promise((resolve) => {
        const eventName = nanoid()
        ctx.hooks.hookOnce(eventName, (res) => {
          resolve({
            content: [{
              type: 'text',
              text: JSON.stringify(res),
            }],
          })
        })
        ctx.rpcServer.getRouterInfo({ event: eventName })
      })
    }
  },
}, {
  name: 'get-pinia-state',
  description: 'Get the Pinia state in JSON structure format.',
  params: {
    storeName: z.string(),
  },
  handler: (ctx: VueMcpContext) => {
    return async ({ storeName }: { storeName: string }) => {
      return new Promise((resolve) => {
        const eventName = nanoid()
        ctx.hooks.hookOnce(eventName, (res) => {
          resolve({
            content: [{
              type: 'text',
              text: JSON.stringify(res),
            }],
          })
        })
        ctx.rpcServer.getPiniaState({ event: eventName, storeName })
      })
    }
  },
}, {
  name: 'get-pinia-tree',
  description: 'Get the Pinia tree in JSON structure format.',
  params: {},
  handler: (ctx: VueMcpContext) => {
    return async () => {
      return new Promise((resolve) => {
        const eventName = nanoid()
        ctx.hooks.hookOnce(eventName, (res) => {
          resolve({
            content: [{
              type: 'text',
              text: JSON.stringify(res),
            }],
          })
        })
        ctx.rpcServer.getPiniaTree({ event: eventName })
      })
    }
  },
}] as {
  name: string
  description: string
  params: ZodRawShape
  handler: (ctx: VueMcpContext) => (args: z.objectOutputType<ZodRawShape, ZodTypeAny>) => Promise<{
    content: {
      type: 'text'
      text: string
    }[]
  }>
}[]
