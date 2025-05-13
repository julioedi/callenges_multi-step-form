import React, { Component } from 'react';
import "@root/styles/general.scss";
import { BannerImage } from './components/Banner';

import { First, Second, Third, Four } from './screens';
import { steps, formFields } from '@root/types';

import { wait } from '@root/utilities/wait';

const screens = [
  First,
  Second,
  Third,
  Four
];

interface stateProps {
  screen: steps,
  names: formFields,
  completed: boolean,
}
class App extends Component {
  state: stateProps = {
    screen: 1 as steps,
    names: {
      name: "",
      email: "",
      phone: "",
      plan_type: "",
      plan_time: "",
      online_service: false,
      large_storage: false,
      custom_profile: false,
    },
    completed: false,
  }

  Empty = () => {
    return null;
  }
  banner: BannerImage | null = null;

  previousIndex: steps = 1;
  nextScreenRenderClass = "";
  animateScreen = async (index: steps, prevent: boolean = false) => {
    let prev: steps = this.state.screen;

    const right = index < prev
    this.nextScreenRenderClass = right ? "left" : "right";
    if (this.currentScreen) {
      this.currentScreen.classList.add(!right ? "left" : "right");

      if (!prevent) {
        await wait(0.33);
        this.banner?.setStep(index);
        await wait(0.33);
      }
    } else {
      if (!prevent) {

        this.banner?.setStep(index);
      }
    }
  }


  setScreen = async (index: steps, data?: any) => {
    if (this.state.completed) {
      return;
    }
    this.firstRender = false;
    let prev: steps = this.state.screen;
    this.previousIndex = prev;
    const names = {
      ...this.state.names,
      ...data,
    };
    await this.animateScreen(index);
    this.setState({
      screen: index,
      names,
    }, () => {
    });
  }

  setNext = (data?: any) => {
    let index = this.state.screen + 1;
    if (index > 4) {
      this.state.completed = true;
      index = 4;
    }
    data = !data ? {} : data;
    this.setScreen(index as steps, data);
  }

  setBefore = () => {
    let index = this.state.screen - 1;
    index = index < 1 ? 1 : index;
    this.setScreen(index as steps);
  }


  currentScreen: HTMLElement | null = null;
  initialOpacity = 0.5;
  firstRender = true;

  render(): React.ReactNode {
    const { screen } = this.state;
    const index = screen - 1;
    const RenderScreen = screens[index] ?? this.Empty;

    const { name, email, phone, plan_time } = this.state.names;

    const tabs = name !== "" && email !== "" && phone !== "";
    const visibility = [
      true,
      tabs,
      tabs,
      tabs
    ]


    return (
      <div id="form" className="p-16 br-28">
        <BannerImage
        commpleted={this.state.completed}
          onChangeStep={async (step) => {
            if (this.state.completed) {
              return;
            }
            await this.animateScreen(step, true);
            this.setState({
              screen: step
            })
          }}
          initialStep={screen}
          ref={ref => {
            this.banner = ref;
          }}
          visibility={visibility}
        />
        <RenderScreen
          defaultData={this.state.names as any}
          container={async (ref) => {
            this.currentScreen = ref;
            if (!ref) {
              return;
            }
            await wait(0);
            ref.className = "screen";
          }}
          screenProps={{
            className: "none " + this.nextScreenRenderClass,
          }}
          changePlan={() => {
            this.setScreen(2)
          }}
          yearly={plan_time != ""}
          onBefore={screen > 1 ? this.setBefore : undefined}
          next={screen != 4 ? undefined : "Confirm"}
          onNext={this.setNext}
          onComplete={() => {
            this.setState({
              completed: true,
            })
          }}
        />
      </div>
    );
  }
}
// const App: React.FC = () => {
//   return <h1>Hello from React + TypeScript + Webpack!</h1>;
// };
export default App;
