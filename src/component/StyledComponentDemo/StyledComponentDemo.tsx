import * as React from 'react';
import {Button} from "./css/styled";

const initialState = {};

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

type State = typeof initialState

class StyledComponentDemo extends React.Component<IProps, State> {
    public state: State = initialState;

    public render() {
        return (
            <div className="StyledComponentDemo">
                <Button height='1px'>123</Button>
            </div>
        );
    }
}

export default StyledComponentDemo
