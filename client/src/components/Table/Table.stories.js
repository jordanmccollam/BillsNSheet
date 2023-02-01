import React from 'react';
import { BsPlus } from 'react-icons/bs';
import Table from './Table';
import { MdDelete } from 'react-icons/md';

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

export const WithActions = {
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
        ],
        actions: [
            {
              label: "Add",
              icon: <BsPlus />,
              func: () => console.log("Add to table"),
              global: true
            },
            {
              label: "Delete",
              icon: <MdDelete />,
              func: () => console.log("Delete item"),
              global: false
            },

        ]
    }
}