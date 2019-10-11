/*
 * @Author: Mr.Hope
 * @Date: 2019-08-07 10:42:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-12 00:40:36
 * @Description: Pub/Sub Module
 */

/**
 *  发布/订阅模块
 */
class Message {
  constructor() {
    this.eventObject = {};
  }

  /**
   * 订阅事件
   *
   * @param eventId 订阅事件名称
   * @param handler 处理函数
   * @param once 是否只处理一次
   *
   * @returns 取消监听函数
   */
  on(eventId, handler, once = false) {
    // 如果时间对象中不存在eventId，则初始化一个空数组
    if (!this.eventObject[eventId]) this.eventObject[eventId] = [];

    // 向eventId队列中注入信息
    this.eventObject[eventId].push({ handler, once });

    // 返回取消监听函数，如果日后需要取消这个监听处理函数则需要调用这个函数。
    return () => this.off(eventId, handler);
  }

  /**
   * 取消订阅事件
   *
   * @param [eventId='all'] 需要取消的订阅事件名称
   * - 设置为`all`即取消所有
   * @param handler 需要取消的监听处理函数，不填则取消所有监听处理函数
   */
  off(eventId = 'all', handler) {
    /** 需要移除的监听id列表 */
    const idList = Array.isArray(eventId) ? eventId : eventId === 'all' ? Object.keys(this.eventObject) : [eventId];

    idList.forEach(key => {
      if (handler) { // 移除特定监听
        const oldHandler = this.eventObject[key] || [];
        const newHandler = [];

        oldHandler.forEach(evtObj => {
          if (evtObj.handler !== handler) newHandler.push(evtObj);
        });

        // 写入新的处理器
        this.eventObject[key] = newHandler;
      } else this.eventObject[key] = []; // 移除所有监听
    });
  }

  /**
   * 触发订阅事件
   *
   * @param eventId 订阅事件名称
   * @param args 参数
   */
  emit(eventId, ...args) {
    /** 事件处理器 */
    const handlers = this.eventObject[eventId] || [];

    handlers.forEach(evtObj => {
      // 如果只调用一次且已经调用过直接结束
      if (evtObj.once && evtObj.called) return;

      evtObj.called = true; // 写入调用状态

      try { // 尝试调用函数
        if (evtObj.handler) evtObj.handler.apply(undefined, args);
      } catch (e) { // 给出错误信息
        console.error(`${eventId}事件监听触发失败：`, e.stack || e.message || e);
      }
    });
  }


  /**
   * 合并不同的pub/sub
   *
   * @param target 需要合并的pub/sub
   */
  assign(target) {
    ['on', 'off', 'emit', 'assign'].forEach(name => {
      target[name] = (...args) => this[name](...args);
    });
  }
}

export const message = new Message();

export default Message;
