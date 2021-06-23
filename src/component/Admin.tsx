import AdminApi from "@api/admin-api";
import * as React from 'react';

class Admin extends React.Component {
    public async componentWillMount() {
        const iAdminModel = await AdminApi.getAdmin();
        console.log(iAdminModel);
    }

    public render() {
        return (
            <div className="Admin">
                App
            </div>
        );
    }
}

export default Admin;