import AdminAPI from "@api/AdminAPI";
import * as React from 'react';
import StyledComponentDemo from "./component/StyledComponentDemo/StyledComponentDemo";
import GlobalCSS from './global-styled'

class App extends React.Component {
    public async componentWillMount() {
        const iAdminModel = await AdminAPI.getAdmin();
        console.log(iAdminModel);
    }

    public render() {
        return (
            <div className="App">
                <StyledComponentDemo/>
                <GlobalCSS/>
            </div>
        );
    }
}
export default App;
