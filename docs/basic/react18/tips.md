# 实践开发小技巧

## 组件相关

### 使用自闭合组件
```tsx
<Comp></Comp>
<Comp /> // 推荐
```

### 使用Fragment来分组组件
```tsx
import Header from "./header";
import Content from "./content";
import Footer from "./footer";

// const Test = () => {
//   return (
//     <div>
//       <Header />
//       <Content />
//       <Footer />
//     </div>
//   );
// };

// 推荐
const Test = () => {
    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
}
```

### 优先分散使用 props，而不是单独访问每个 props
```tsx
// const Comp = (props) => {
//     return <div onClick={() => props.changeText } >{props.text}</div>;
// }

// 推荐
const Comp = ({ text, changeText }) => {
    return <div onClick={() => changeText}>{text}</div>;
}
```

### 在解构时设置props的默认值
```tsx
const Button = ({ size= 'mini', type: ButtonType = 'primary'}) => {
    return <Component size={ size } type={type} />
}
```

### 条件渲染&&确保是布尔值
```tsx
const dataList = ({ data }) => {
    return <Container> 
        {
            data.length > 0 && <Comp list={data} />
        }
    </Container>
}
```

### 将不依赖组件 props/state 的数据移到组件外部
```tsx
const ToolSelector = () => {
  const options = [
    {
      label: "html工具",
      value: "html-tool",
    },
    {
      label: "css工具",
      value: "css-tool",
    },
    {
      label: "js工具",
      value: "js-tool",
    },
  ];
  const renderOption = ({
    label,
    value,
  }: {
    label?: string;
    value?: string;
  }) => <Option value={value}>{label}</Option>;
  return (
    <Select placeholder="请选择工具">
      {options.map((item, index) => (
        <Fragment key={`${item.value}-${index}`}>{renderOption(item)}</Fragment>
      ))}
    </Select>
  );
};

// 1. 非依赖外移
const options = [
    {
      label: "html工具",
      value: "html-tool",
    },
    {
      label: "css工具",
      value: "css-tool",
    },
    {
      label: "js工具",
      value: "js-tool",
    },
];

const renderOption = ({ label, value } : { label?: string; value?: string;}) => {
    return <Option value={value}>{label}</Option>;
}

const ToolSelector = () => {
  return (
    <Select placeholder="请选择工具">
      {
        options.map((item, index) => (
            <Fragment key={`${item.value}-${index}`}>{renderOption(item)}</Fragment>
        ))
      }
    </Select>
  );
};


 // 2. 元素内联进一步简化
 const options = [
    {
      label: "html工具",
      value: "html-tool",
    },
    {
      label: "css工具",
      value: "css-tool",
    },
    {
      label: "js工具",
      value: "js-tool",
    },
];

const ToolSelector = () => {
    return (
        <Select placeholder="请选择工具">
            {
                options.map((item, index) =>  ( // 注意此处使用圆括号
                    return <Option value={item.value}>{item.label}</Option>
                ))
            }
        </Select>
    )
}
```

### 如果需要多次用到 prop 里面的值，那就引入一个新的组件
```tsx
// 原代码
const CreatForm = ({ type }) => {
  const formList = useMemo(() => {
    if (type === null) {
      return [];
    }
    return getFormList({ type });
  }, [type]);
  const onHandleChange = useCallback(
    (id) => {
      if (type === null) {
        return;
      }
      // do something
    },
    [type]
  );
  if (type === null) {
    return null;
  }

  return (
    <>
      {formList.map(({ value, id, ...rest }, index) => (
        <item.component
          value={value}
          onChange={onHandleChange}
          key={id}
          {...rest}
        />
      ))}
    </>
  );
};


// 优化后
const FormList = ({ type }) => {
    const formList = useMeemo(() => getFormList({ type }), [type]);
    const onHandleChange = useCallback((id) => {
        // do something
    }, [type]);

    return (
        <>
            {
                fromList.map({ value, id, ...rest}, index => (
                    <item.component 
                        value={value} 
                        onChange={onHandleChange} 
                        key={id} 
                        {...rest} />
                ))
            }
        </>
    )
}
const CreatForm = ({ type }) => {
    if (type === null) {
        return null;
    }
    return <FormList type={type} />
}
```

## 有效的设计模式与技巧

### 利用 children 属性来获得更清晰的代码
使用子组件 props 有几个好处：<br/>

+ 1：你可以通过将 props 直接传递给子组件而不是通过父组件路由来避免 prop 混入。
+ 2：你的代码更具可扩展性，因为你可以轻松修改子组件而无需更改父组件。
+ 3：你可以使用此技巧避免重新渲染组件。


```tsx
const Container = () => <Timer />;

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <h1>当前时间:{ dayjs(time).format("YYYY-MM-DD HH:mm:ss") }</h1>

      {/* 每次time 更新都会重新渲染OtherSlowComponent组件 */}
      <OtherSlowComponent />  
    </>
  );
};

// 推荐
const Container = () => {
    <Timer>
        <OtherSlowComponent />  
    </Timer>
}

const Timer = ({ children }) => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <h1>当前时间:{ dayjs(time).format("YYYY-MM-DD HH:mm:ss") }</h1>

      { children }
    </>
  );
}
```


### 使用 ref 回调函数执行诸如监控大小变化和管理多个节点元素等任务

文本框聚焦
```tsx 
const FocusInput = () => {
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return <input ref={ref} type="text" />;
};

// 推荐
const FocusInput = () => {
  const ref = useCallback((node) => {
    if (node) node.focus();
  }, []);

  return <input ref={ref} type="text" />;
}
```

## 组织 React 代码

###  将 React 组件与其资源（例如样式、图像、声明等）放在一起

### 限制组件文件大小

### 限制功能组件文件中的返回语句数量
```tsx
export interface UserInfo {
  id: string;
  name: string;
  age: number;
}
export interface UserListProps {
  users: UserInfo[];
  searchUser: string;
  onSelectUser: (u: UserInfo) => void;
}
const UserList: React.FC<UserListProps> = ({
  users,
  searchUser,
  onSelectUser,
}) => {
  const filterUsers = users?.filter((user) => {
    // 多余return语句
    return user.name.includes(searchUser);
  });

  const onSelectUserHandler = (user) => {
    // 多余return语句
    return () => {
      onSelectUser(user);
    };
  };

  return (
    <>
      <h2>用户列表</h2>
      <ul>
        {filterUsers.map((user, index) => {
          return (
            <li key={`${user.id}-${index}`} onClick={onSelectUserHandler(user)}>
              <p>
                <span>用户id</span>
                <span>{user.id}</span>
              </p>
              <p>
                <span>用户名</span>
                <span>{user.name}</span>
              </p>
              <p>
                <span>用户年龄</span>
                <span>{user.age}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};


// 推荐
... 
// 同上, 省略
const UserList: React.FC<UserListProps> = ({
  users,
  searchUser,
  onSelectUser,
}) => {
  const filterUsers = users?.filter((user) => user.name.includes(searchUser));
  const onSelectUserHandler = (user) => () => onSelectUser(user);
  // 仅一个return语句
  return (
    <>
      <h2>用户列表</h2>
      <ul>
        {filterUsers.map((user, index) => (
          <li key={`${user.id}-${index}`} onClick={onSelectUserHandler(user)}>
            <p>
              <span>用户id</span>
              <span>{user.id}</span>
            </p>
            <p>
              <span>用户名</span>
              <span>{user.name}</span>
            </p>
            <p>
              <span>用户年龄</span>
              <span>{user.age}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
```

### 优先使用命名导出而不是默认导出
```tsx
//默认导出
export default function App() {
  // 组件内容
  ...
}

// 命名导出
export function App() {
  // 组件内容
  ...
}

// 默认导入
import App from "/path/to/App";
// 命名导入
import { App } from "/path/to/App";

// 修改文件名为Index.tsx
// 默认导入名字并未更改
import App from "/path/to/Index";
// 命名导入名字已更改
import { Index } from "/path/to/Index";
```

## 高效的状态管理

### 将state创建在仅需要更新的`组件内部`,以减少组件的重新渲染
```tsx
const App = () => {
  const [type, setType] = useState("");

  return (
    <Container>
       <LeftList />
          <Main type={type} setType={setType} />
        <RightList />
    </Container>
  )
}

const mainBtnList = [
  { label: "首页", value: "home"},
  { label: "详情页",value: "detail"},
];

const Main = ({ type, setType}) => {
  return (
    <>
      {
        mainBtnList.map((item, index) => (
          <Button
            className={`${type.value === type ? "active" : ""}`}
            key={`${item.value}-${index}`}
            onClick={() => setType(item.value)}>
          {item.label}
        </Button>
        ))
      }
    </>
  )
}

// 推荐
const App = () => {
  return (
    <Container>
       <LeftList />
          <Main /> 
        <RightList />
    </Container>
  )
}

const Main = () => {
  // 将state耦合到 Main 组件内部，仅影响 Main 组件的重新渲染
  const [type, setType] = useState("");
  const mainBtnList = [
    { label: "首页", value: "home"},
    { label: "详情页",value: "detail"},
  ];
  return (
    <>
      {
          mainBtnList.map((item, index) => (
            <Button
                className={`${type === item.value ? "active" : ""}`}
                key={`${item.value}-${index}`}
                onClick={() => setType(item.value)}>
              {item.label}
            </Button>
          ))
      }
    </>
    )
  }
```

### 定义需要明确初始状态和当前状态的区别

```tsx
const UserInfp = ({ userinfo }) => {
  const [userinfo, setUserinfo] = useState(userinfo);

  return (
    <Card>
      <Title>当前用户: {userInfo?.name}</Title>
      <UserInfoDetail detail={userInfo?.detail} />
    </Card>
  )
}

// 推荐
const UserInfp = ({ initUserinfo }) => {
  const [userinfo, setUserinfo] = useState(initUserinfo);

  return (
    <Card>
      <Title>当前用户: {userInfo?.name}</Title>
      <UserInfoDetail detail={userInfo?.detail} />
    </Card>
  )
}
```

