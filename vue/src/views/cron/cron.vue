<template>
    <div>
        <Card dis-hover bordered>
            <!-- 页面头部标题 -->
            <p slot="title">
                <Icon type="ios-alarm-outline" /> 定时任务管理
            </p>

            <!-- 表格头部 增删改的按钮  -->
            <Form inline>
                <FormItem>
                    <Button type="primary" icon="ios-add-circle-outline" style="margin-right: 10px"
                        @click="showInput">新增</Button>
                    <Button type="error" icon="md-trash" :disabled="disableDeleteButtom"> 删除</Button>
                </FormItem>
            </Form>

            <!-- 按编辑或者添加的 弹窗 -->
            <Modal v-model="showModal" title="添加定时任务" :closable="false" @on-ok="handleConfirm">
                <Form :model="inputTableFrom">
                    <FormItem label="名称">
                        <Input v-model="inputTableFrom.name" />
                    </FormItem>
                    <FormItem label="cron表达式">
                        <Input v-model="inputTableFrom.content" />
                    </FormItem>
                    <FormItem label="调用目标">
                        <Input v-model="inputTableFrom.callFunc" />
                    </FormItem>
                    <FormItem label="任务状态">
                        <Select v-model="inputTableFrom.status">
                            <Option v-for="item in workStatus" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>

                </Form>
            </Modal>

            <!-- 表格内容-->
            <Table stripe border ref="selection" @on-selection-change="tableSelectChange" :columns="columns1"
                :data="tableData">
                <template slot-scope="{ row }" slot="status">
                    <div v-if="row.status == 'start'">
                        <strong>启用</strong>
                    </div>
                    <div v-else>
                        <strong>禁用 </strong>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small" style="margin-right: 5px" @click="modify(row)">编辑</Button>
                    <Button type="error" size="small" @click="remove(row)">删除</Button>
                </template>
            </Table>
        </Card>
    </div>
</template>

<script>
import { apiCronTaskpage, admCronTaskAdd, admCronTaskDrop, admCronTaskEdit } from "@/api/cronTask";

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
                    slot: 'status',
                },
                {//操作按钮
                    title: '操作',
                    slot: 'action',
                    fixed: 'right',
                    width: 150,
                }
            ],
            tableData: [],
            inputTableFrom: {
                name: "",
                content: "",
                callFunc: "",
                status: "",
            },
            workStatus: [
                {
                    value: 'start',
                    label: '启用'
                },
                {
                    value: 'stop',
                    label: '禁用'
                }
            ],
            showModal: false, // 是否显示弹窗
            modfiyFlag: false, //是否关闭修改按钮
            disableDeleteButtom: true, //是否闭删除按钮
            multipleSelection: [],  //多选状态
            tableCount: 0, //定时任务的总数
            tabPage: { pi: 1, ps: 12 }, //分页参数
        }
    },
    //在组件挂载到 DOM 后执行函数
    mounted() {
        this.init()
        console.log('mount data');
    },
    methods: {
        init() { //获取目前已经存在的定时任务数据
            this.inputTableFrom = {} //清空弹框的预置内容

            apiCronTaskpage(this.tabPage).then((resp) => {
                if (resp.code == 200) {
                    this.tableData = resp.data.items;
                    this.tabCount = resp.data.count;
                } else {
                    this.tableData = [];
                    this.tabCount = 0;
                }
            });
        },
        showInput() {
            this.showModal = true;
            this.modfiyFlag = false;
            this.inputTableFrom = {}
        },


        handleConfirm() {
            console.log('输入框的值是：', this.inputTableFrom);
            this.showModal = false;
            if (!this.modfiyFlag) {
                admCronTaskAdd(this.inputTableFrom).then((resp) => {
                    if (resp.code == 200) {
                        this.$Message.success({ content: "添加成功" });
                    } else {
                        this.$Message.error({ content: resp.msg, duration: 3 });
                    }
                    this.init()
                });
            } else {
                admCronTaskEdit(this.inputTableFrom).then((resp) => {
                    if (resp.code == 200) {
                        this.$Message.success({ content: "修改成功" });
                    } else {
                        this.$Message.error({ content: resp.msg, duration: 3 });
                    }
                    this.init()
                });
            }

            this.init()
        },
        tableSelectChange(row) {
            this.multipleSelection = []  //初始化清空
            row.forEach(item => {
                this.multipleSelection.push(item.id)
            }) //将选中的值  id保存到 multipleSelection数组
            console.log('table select ', this.multipleSelection);
            if (this.multipleSelection.length > 0) { //单选的时候支持 删除和修改
                this.disableDeleteButtom = false
            } else { //未选中是，删除和修改都不支持
                this.disableDeleteButtom = true
            }

        },
        remove(row) {
            console.log('remove index ', row.id);
            admCronTaskDrop({ id: row.id }).then((resp) => {
                if (resp.code == 200) {
                    this.$Message.success({ content: "添加成功" });
                } else {
                    this.$Message.error({ content: resp.msg, duration: 3 });
                }
                this.init()
            })
        },
        modify(row) {
            this.modfiyFlag = true
            this.showModal = true; //打开弹框
            this.inputTableFrom = { ...row }; //填充弹窗数据
            console.log('remove index ', row);
        }
    }
};
</script>
