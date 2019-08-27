import * as React from 'react';
import AdminApi from "@api/admin-api";
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