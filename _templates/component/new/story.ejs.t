---
to: client/src/components/<%= name %>/<%= name %>.stories.js
unless_exists: true
---
import React from 'react';

import <%= name %> from './<%= name %>';

export default {
  title: '<%= name %>',
  component: <%= name %>,
};

const Template = (args) => < <%= name %> {...args} />;

export const Default = {
    args: {

    }
}