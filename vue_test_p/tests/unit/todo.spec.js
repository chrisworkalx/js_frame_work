/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 15:54:02
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 17:13:57
 * @FilePath     : \\js_frame_work\\vue_test_p\\tests\\unit\\todo.spec.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
import { shallowMount } from "@vue/test-utils";
import Todo from "@/views/Todo.vue";
import axios from "axios";

describe("data实例", () => {
  it("text", () => {
    expect(typeof Todo.data().text).toBe("string");
  });
  it("list ", () => {
    expect(Array.isArray(Todo.data().list)).toBeTruthy();
  });
});

describe("增", () => {
  it("添加数据", () => {
    const warp = shallowMount(Todo);
    warp
      .find(".add")
      .trigger("click")
      .then(() => {
        expect(warp.vm.list.length).toBeGreaterThan(Todo.data().list.length);
      });
  });
});

describe("删", () => {
  it("删除数据", () => {
    const warp = shallowMount(Todo);
    warp
      .find(".del")
      .trigger("click")
      .then(() => {
        expect(warp.vm.list.length).toBeLessThan(Todo.data().list.length);
      });
  });
});

describe("查", () => {
  it("查询数据", async () => {
    const warp = shallowMount(Todo);
    await warp.vm.getList();
    expect(warp.vm.list.length).toBeGreaterThan(Todo.data().list.length);
  });
});

describe("检查接口", () => {
  it("检查接口", async () => {
    let { data } = await axios.get("http://localhost:8080/list.json");
    expect(data.code).toBe(0);
  });
});
