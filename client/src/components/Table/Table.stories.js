import React from 'react';

import Table from './Table';

export default {
  title: 'Table',
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const WithData = {
    args: {
        data: [
            {
                _id: 1,
                description: "Rent",
                amount: 400,
                date: "05"
            }
        ],
        columns: [
            {label: "Description", property: "description"},
            {label: "Amount", property: "amount"},
            {label: "Date", property: "date"}
        ]
    }
}

export const WithoutData = {
    args: {
        data: [],
        columns: [{label: "Label here", property: "", size: ""}]
    }
}