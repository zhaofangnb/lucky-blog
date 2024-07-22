# 自定义弹窗

```bash
@customDialog
struct CustomDialogExample {
    contriller: CustomDialogController = new CustomDialogController({
        builder: CustomDialogExample((
            confirm: (value) => {
                // 实现
            }
        ))，
        alignment: DialogAlignment.Bottom,
        offset: {
            dx: 0 ,
            dy: -20
        }
    })
    confirm: (value: string) => void
    value: string = ''

    build() {
        Column() {
            Text('请输入你的答案:')
            .fontSize(20)
            .margin({ top: 10, bottom: 10 })
            TextInput({ placeholder: '请输入数字'})
            .type(InputType.Number)
            .onChange(value => {
                this.value = value;
            })
            Row() {
                Button('取消')
                .onClick(() => {
                    this.contriller.close();
                    #  this.contriller.open();
                })
                Button('确认')
                .onClick(() => {
                    this.confirm(this.value)；
                    this.contriller.close();
                })
            }
        }
    }
}
```