# 前端解析XLSX文档

安装
```
npm install xlsx
```

```ts
// readExcelToJson.ts
import * as XLSX from 'xlsx'
import { ElMessage } from 'element-plus'

async function readExcelToJson (file:any) {
    const types = file.name?.split(".")
    const type = types[types.length - 1]
    const fileType = ["xlsx", "xls", "XLSX", "XLS"].some(item => item == type)
    if (!fileType) {
        ElMessage.error('文件格式错误!请重新选择')
        return
    }
    const result:any = []
    const loaded = (row:any) => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = function(e) {
                const data = e.target?.result
                const wb = XLSX.read(data, {
                    type: 'binary'
                })
                wb.SheetNames.forEach((sheetName) => {
                    result.push(
                        XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
                            header: 1,
                            defval: ""
                        })
                    )
                })
                resolve(true)
            }
            reader.readAsBinaryString(row);
        })
    }

    await loaded(file.raw || file)
    console.log("result", result)
}

export {
    readExcelToJson
}
```

自定义上传:
```html
<el-upload
    drag
    action=""
    :on-preview=""
    :on-remove=""
    :file-list="fileList"
    :before-upload=""
    :http-request="uploadExcel"
    :limit="1"
    :auto-upload="false">
    <el-button size="mini" type="primary">上传文件</el-button>
</el-upload>
```

```js
data() {
    return {
        fileList:[]
    }
},
methods: {
    uploadExcel(options) {
        let file = options.file
        let formdata = new FormData()
        // 调用接口
    }
}
```

input文件类型上传:
```html
<div 
    class="upload"
    id="upload" 
    @click="openFile"
    @drop="drop($event)"
    @dragenter="dragenter($event)"
    @dragiver="dragover($event)">
    点击上传
</div>

<input
    @change="fileChange($event)"
    type="file"
    id="upload_file"
    :disabled="uploadDisabled"
    style="display: none"
/>
```
```ts
const uploadDisabled = ref(false)
const openFile = () => {
    (document.getElementById("upload_file") as any).click();
};
// 拖动目标且鼠标进入投放区时触发
const dragenter = (el: DragEvent) => {
    el.preventDefault();
    el.stopPropagation();
};
// 拖动目标且鼠标移动在投放区时触发
const dragover = (el: DragEvent) => {
    el.preventDefault();
    el.stopPropagation();
};
const drop = (el: DragEvent) => {
    el.preventDefault();
    el.stopPropagation();
    const file = el.dataTransfer!.files[0];
    validFile(file);
};
const validFile = (file: any) => {
    if (
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        proxy.$message.error("上传文件只能是excel格式！");
        return;
    }
    const fileLimit = file.size / 1024 / 1024 < 50;
    if (!fileLimit) {
        proxy.$message.error("上传文件大小不超过50M！");
        return;
    }
    fileObj.value = file;
    fileName.value = file.name;
    showUpload.value = true;
};
const fileChange = (e: any) => {
    let file = e.target.files[0];
    validFile(file);
    e.target.value = "";
};
```