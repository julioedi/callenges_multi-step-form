import React, { Component } from 'react';
import "@root/styles/general.scss";
import { BannerImage } from './components/Banner';

import { First } from './screens';


const screens = [
  First
];
class App extends Component {
  state = {
    screen: 1 as 1 |2 | 3 | 4,
    fields: [
      {
        name: "",
        email: "",
        phone: ""
      },

    ]
  }

  Empty = () => {
    return null;
  }
  banner:BannerImage|null = null;

  render(): React.ReactNode {
    const index = this.state.screen - 1;
    let next = this.state.screen + 1;
    const RenderScreen = screens[index] ?? this.Empty;
    return (
      <div id="form" className="p-16 br-28">
        <BannerImage onChangeStep={(step) => {
          this.setState({
            screen: step
          })
        }}
        initialStep={this.state.screen}
        ref={ref =>{
          this.banner = ref;
        }}
        />
        <RenderScreen
          defaultData={this.state.fields[index]}
          onNext={(data) => {
            const fields = [...this.state.fields];
            if (data) {
              fields[index] = data;
            }
            this.setState({
              screen: next,
              fields
            })
            this.banner?.setStep(next as any)
            
          }} />
      </div>
    );
  }
}
// const App: React.FC = () => {
//   return <h1>Hello from React + TypeScript + Webpack!</h1>;
// };
export default App;
