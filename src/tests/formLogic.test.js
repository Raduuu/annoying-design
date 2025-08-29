import Form from '../components/Form/index.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('Form', () => {
  it('renders correctly', () => {
    const wrapper = mount(Form);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with initial values', () => {
    const wrapper = mount(Form);

    expect(wrapper.exists()).toBe(true);

    const helper = wrapper.find('.helper');
    expect(helper.text()).toBe('Hint: HCL is awesome');

    const input = wrapper.find('input');
    expect(input.element.value).toBe('Type here...');
  });
});