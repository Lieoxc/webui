<template>
    <div>
        <Card dis-hover bordered>
            <p slot="title">
                <Icon type="ios-alarm-outline" /> 定时任务管理
            </p>
            <Form inline>
                <FormItem>
                    <Button type="primary" icon="ios-add-circle-outline" style="margin-right: 10px"
                        @click="showInput" >新增</Button>
                    <Button type="info" icon="ios-create" style="margin-right: 10px"
                    @click="showModify" :disabled="modifyButtomStatus" >修改</Button>
                    <Button type="error" icon="md-trash" :disabled="deleteButtomStatus" > 删除</Button>
                </FormItem>
            </Form>
            <Modal v-model="showModal" title="添加定时任务" :closable="false" @on-ok="handleOk">
                <Form :model="form">
                    <FormItem label="名称">
                        <Input v-model="inputTableFrom.name" />
                    </FormItem>
                    <FormItem label="cron表达式">
                        <Input v-model="inputTableFrom.cron" />
                    </FormItem>
                    <FormItem label="调用目标">
                        <Input v-model="inputTableFrom.func" />
                    </FormItem>
                    <FormItem label="任务状态">
                        <Input v-model="inputTableFrom.status" />
                    </FormItem>
                </Form>
            </Modal>
            <Table stripe border ref="selection" height="200" :columns="columns1" :data="tableData">
            </Table>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',

                },
                {
                    title: '编号',
                    width: 60,
                    key: 'id',
                },
                {
                    title: '名称',
                    key: 'name',
                },
                {
                    title: 'cron表达式',
                    key: 'content',
                },
                {
                    title: '调用目标',
                    key: 'callFunc',
                },
                {
                    title: '状态',
                    key: 'status',
                },
                {//操作按钮
                    title: 'Action',
                    key: 'action',
                    fixed: 'right',
                    width: 150,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: "margin-right: 10px"
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableData: [
                {
                    id: 1,
                    name: 'John Brown',
                    content: "0/5 * * * *",
                    callFunc: "heloworld",
                    status: '停用',
                },
                {
                    id: 2,
                    name: 'John Brown',
                    content: "0/56 * * * *",
                    callFunc: "heloworld",
                    status: '停用',
                },
                {
                    id: 2,
                    name: 'John Brown',
                    content: "0/2 * * * *",
                    callFunc: "heloworld",
                    status: '启用',
                }
            ],
            inputTableFrom: {
                name: "",
                cron: "",
                func: "",
                status: "",
            },
            showModal: false, // 是否显示弹窗
            modifyButtomStatus:true , //是否使能修改按钮
            deleteButtomStatus:true //是否使能删除按钮
        }
    },
    methods: {
        showInput() {
            this.showModal = true;
        },
        showModify(){
            this.showModal = true;
        },
        handleOk() {
            console.log('输入框的值是：', this.inputValue);
            this.showModal = false;
        },
    }
};
</script>
