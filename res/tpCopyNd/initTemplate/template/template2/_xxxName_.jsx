import React, {useContext} from 'react';
// import {} from 'choerodon-ui/pro';
import {observer} from 'mobx-react-lite';
import './index.less';
import Store from './Store';

const _xxxName_ = observer(() => {
    const context = useContext(Store);
    return (<div></div>);
});

export default _xxxName_;
