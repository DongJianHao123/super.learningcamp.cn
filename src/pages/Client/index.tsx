/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useRef } from "react";
import {  PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { IClient } from "core/types/client";
import { getClientsList } from "@api/client";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Utils } from "@common/utils";

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};


const columns = (navigate: NavigateFunction): ProColumns<IClient>[] => [
    {
        dataIndex: "index",
        title: "序号",
        valueType: "index",
        align: 'center'
    },
    {
        dataIndex: 'logo',
        title: 'logo',
        align: 'center',
        hideInSearch: true,
        render: (logo, client, index) => {
            return <img style={{ height: 40 }} key={`client-logo-${index}`} src={logo as string} alt="logo" />
        }
    },
    {
        title: "机构名称",
        dataIndex: "name",
        // copyable: true,
        ellipsis: true,
        // tip: "标题过长会自动收缩",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
    {
        title: "域名",
        align: 'center',
        dataIndex: "clientName",
    },
    {
        title: "手机号",
        dataIndex: "phone",
        align: 'center',
    },
    {
        title: "邮箱",
        dataIndex: "email",
        align: 'center',
    },
    {
        title: "状态",
        dataIndex: "status",
        valueType: "select",
        align: 'center',
        valueEnum: {
            1: {
                key: 1,
                text: "开启",
            },
            0: {
                key: 2,
                text: "关闭",
            },
        },
    },
    {
        title: "创建时间",
        dataIndex: "createAt",
        valueType: "dateRange",
        hideInTable: true,
        sorter: true,
        search: {
            transform: (value) => {
                return {
                    startTime: new Date(value[0]).getTime(),
                    endTime: new Date(value[1]).getTime(),
                };
            },
        },
    },
    {
        title: "创建时间",
        dataIndex: "createAt",
        valueType: "date",
        align: 'center',
        hideInSearch: true,
    },
    {
        title: "修改时间",
        dataIndex: "updateAt",
        align: 'center',
        valueType: "date",
        hideInSearch: true,
    },
    {
        title: "操作",
        valueType: "option",
        key: "option",
        align:'center',
        render: (text, record) => [
            <Button
                key="editable"
                onClick={() => { navigate(`/client/edit/${record.clientId}`) }}
                type="link"
            >
                编辑
            </Button>
        ],
    },
];

const Client: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const navigate = useNavigate()
    return (
        <ProTable<IClient>
            columns={columns(navigate)}
            actionRef={actionRef}
            cardBordered
            request={async (params) => {
                const _res = await getClientsList(Utils.common.clearEmpty(params))
                return {
                    data: _res.data.list,
                    // success 请返回 true，
                    // 不然 table 会停止解析数据，即使有数据
                    success: _res.result === 1,
                    // 不传会使用 data 的长度，如果是分页一定要传
                    // total: number,
                };
            }}
            editable={{
                type: "multiple",
            }}
            rowKey="id"
            search={{
                labelWidth: "auto",
            }}
            headerTitle="机构列表"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        navigate('/client/edit/0')
                    }}
                    type="primary"
                >
                    新建
                </Button>
            ]}
        />
    );
};

export default Client;
