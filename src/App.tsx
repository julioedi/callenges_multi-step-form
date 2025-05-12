import React, { Component } from 'react';
import "@root/styles/general.scss";
import { BannerImage } from './components/Banner';

import { First, Second } from './screens';


type steps = 1 | 2 | 3 | 4

const wait = async (time = 0.3) => {
  await new Promise(res => {
    setTimeout(() => {
      res(true)
    }, time * 1000)
  })
}
const screens = [
  First,
  Second
];
class App extends Component {
  state = {
    screen: 1 as steps,
    fields: [
      {
        name: "",
        email: "",
        phone: ""
      },
      {
        plan_type: "",
        plan_time: "",
      }
    ],
    filledSteps: [
      true,
      false,
      false,
      false
    ]
  }

  Empty = () => {
    return null;
  }
  banner: BannerImage | null = null;

  previousIndex: steps = 1;
  nextScreenRenderClass = "";
  setScreen = async (index: steps, data?: any) => {
    this.firstRender = false;
    let prev: steps = this.state.screen;
    this.previousIndex = prev;
    const fields = [...this.state.fields];
    if (data) {
      fields[prev - 1] = data;
    }
    const right = index < prev
    this.nextScreenRenderClass = right ? "left" : "right";
    if (this.currentScreen) {
      this.currentScreen.classList.add(!right ? "left" : "right");
      
      await wait(0.33);
      this.banner?.setStep(index);
      await wait(0.33);
    }else{
      this.banner?.setStep(index);
    }
    this.setState({
      screen: index,
      fields,
    },() =>{
    });
  }
  setNext = (data?: any) => {
    let index = this.state.screen + 1;
    index = index > 4 ? 4 : index;
    this.setScreen(index as steps, data);
  }
  setBefore = () =>{
    let index = this.state.screen - 1;
    index = index < 1 ? 1 : index;
    this.setScreen(index as steps);
  }


  currentScreen: HTMLElement | null = null;
  initialOpacity = 0.5;
  firstRender = true;
  
  render(): React.ReactNode {
    const index = this.state.screen - 1;
    let next = this.state.screen + 1;
    const RenderScreen = screens[index] ?? this.Empty;

    const { filledSteps } = this.state
    const [info, plans] = this.state.fields;

    const tabs = info.name !== "" && info.email !== "" && info.phone !== "";
    const visibility = [
      true,
      tabs,
      tabs,
      tabs
    ]

    return (
      <div id="form" className="p-16 br-28">
        <BannerImage
          onChangeStep={(step) => {
            this.setState({
              screen: step
            })
          }}
          initialStep={this.state.screen}
          ref={ref => {
            this.banner = ref;
          }}
          visibility={visibility}
        />
        <RenderScreen
          defaultData={this.state.fields[index] as any}
          container={async (ref) => {
            this.currentScreen = ref;
            if (!ref) {
              return;
            }
            await wait(0);
            ref.className = "screen";
          }}
          screenProps={{
            className: "none " + this.nextScreenRenderClass
          }}
          onBefore={this.state.screen > 1 ? this.setBefore : undefined}
          onNext={this.setNext} />
      </div>
    );
  }
}
// const App: React.FC = () => {
//   return <h1>Hello from React + TypeScript + Webpack!</h1>;
// };
export default App;
