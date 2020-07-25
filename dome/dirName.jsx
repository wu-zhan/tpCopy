import React, {useContext} from 'react';
// import {} from 'choerodon-ui/pro';
import {observer} from 'mobx-react-lite';
import './index.less';
import Store from './Store';
// for(){
const dirName = observer(() => {
    const context = useContext(Store);
    return (<div></div>);
});
// }
export default dirName;
