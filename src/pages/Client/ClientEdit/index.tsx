import { PageContainer, ProForm, ProFormText, ProFormUploadButton } from "@ant-design/pro-components";
import { Col, Form, Space, message } from "antd";
import { RcFile } from "antd/es/upload";
import { requiredRule } from "@common/CTYPE";
import { fileUpload } from "@common/oss";
import React from "react";
import { useParams } from "react-router-dom";
import { IClient } from "@core/types/client";
import { SafeAny } from "@core/types/Safe";
import U from "@common/utils/U";
import { createClient, getClientById, updateClient } from "@api/client";

const ClientEdit: React.FC = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const isAdd = id === '0' || !id;

    const handleImgUpload = (file: RcFile) => {
        fileUpload(file).then((res: SafeAny) => {
            form.setFieldsValue({
                logo: [
                    Object.assign(file, {
                        url: `https://ssl.cdn.maodouketang.com/${res.key}`,
                    }),
                ],
            });
        });
        return ''
    };

    const handleSubmit = (values: SafeAny): SafeAny => {
        const { name, clientName, phone, password, logo, _password, email } = values
        if (!U.str.isChinaMobile(phone)) {
            message.warning('请填写正确的手机号')
            return
        }
        if (!U.str.isValidEmail(email)) {
            message.warning('请输入正确的邮箱')
            return
        }
        if(isAdd){
            if (!U.str.passwordValid(password)) {
                message.warning('密码不少于6位，可以是数字、字母、符号。')
                return;
            }
            if (password !== _password) {
                message.warning('两次输入密码不一致')
                return
            }
        }
        const client: IClient = {
            name,
            clientName,
            phone,
            email,
            password,
            logo: logo[0].url,
            status: 1,
            type: 1,
        }
        if (isAdd) {
            createClient(client).then((res: SafeAny) => {
                message.success('新建成功')
                console.log('新建client==>', res);
                history.back()
            })
        } else {
            updateClient({ ...client, clientId: id }).then((res: SafeAny) => {
                message.success('修改成功')
                console.log('修改==>', res);
                history.back()
            })
        }

    }

    return (
        <PageContainer
            header={{
                onBack: () => history.back(),
                title: `${isAdd ? '新建' : '编辑'}机构`
            }}
        // style={{ paddingBottom: '100px' }}
        >
            <ProForm<IClient>
                form={form}
                grid
                layout="horizontal"
                labelCol={{ span: 10 }}
                submitter={{
                    render: (props, doms) => {
                        return (
                            <Col offset={8} >
                                <Space>{doms}</Space>
                            </Col>
                        );
                    },
                }}
                request={async () => {
                    if (!isAdd) {
                        const res = await getClientById(parseInt(id));
                        console.log(res);
                        return { ...res.data, logo: [{ url: res.data?.logo }] } as any
                    } else {
                        return {}
                    }
                }}
                onFinish={handleSubmit}
            >
                <ProFormText
                    name="name"
                    label="机构名称"
                    colProps={{ md: 24, xl: 16 }}
                    required
                    placeholder="请输入"
                    rules={requiredRule}
                />
                <ProFormText
                    name="clientName"
                    label="域名"
                    colProps={{ md: 24, xl: 16 }}
                    required
                    placeholder="请输入"
                    rules={requiredRule}
                />
                <ProFormText
                    name="phone"
                    label="手机号"
                    colProps={{ md: 24, xl: 16 }}
                    required
                    placeholder="请输入"
                    rules={requiredRule}
                />
                {isAdd && <>
                    <ProFormText.Password
                        name="password"
                        label="密码"
                        colProps={{ md: 24, xl: 16 }}
                        required
                        placeholder="请输入"
                        rules={requiredRule}
                    />
                    <ProFormText.Password
                        name="_password"
                        label="确认密码"
                        colProps={{ md: 24, xl: 16 }}
                        required
                        placeholder="请输入"
                        rules={requiredRule}
                    />
                </>}
                <ProFormText
                    name="email"
                    label="邮箱"
                    colProps={{ md: 24, xl: 16 }}
                    required
                    placeholder="请输入"
                    rules={requiredRule}
                />

                <ProFormUploadButton
                    name="logo"
                    label="机构logo"
                    colProps={{ md: 24, xl: 16 }}

                    max={1}
                    required
                    fieldProps={{
                        name: 'file',
                        listType: 'picture-card',
                    }}
                    rules={requiredRule}
                    action={handleImgUpload}
                    extra="建议图片比例为16:9"
                    accept="image/*"
                />

            </ProForm>
        </PageContainer>
    );
};

export default ClientEdit;
