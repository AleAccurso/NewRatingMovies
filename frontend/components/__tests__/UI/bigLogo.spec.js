import { shallowMount } from "@vue/test-utils";
import bigLogo from "../../UI/bigLogo";

let wrapper = shallowMount(bigLogo);

describe("bigLogo", () => {
  let logo = wrapper.find("#bigLogo");

  test("Render correctly", () => {
    expect(logo.exists()).toBe(true);
  });
});
