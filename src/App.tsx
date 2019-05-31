import * as React from 'react';
import AdminAPI from "./api/AdminAPI";


class App extends React.Component {
  public async componentWillMount() {
    const iAdminModel = await AdminAPI.getAdmin();
    console.log(iAdminModel);
  }
  
  public render() {
    return (
      <div className="App">
        App
      </div>
    );
  }
}

export default App;
