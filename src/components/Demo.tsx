import * as React from 'react';

const initialState = {num: 0}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {

}

/*your import*/

type State = typeof initialState

class Demo extends React.Component<IProps, State> {
  public state: State = initialState
  
  public render() {
    const num = this.state.num
    return (
      <div className="Demo">
        {num}
      </div>
    );
  }
}

export default Demo
