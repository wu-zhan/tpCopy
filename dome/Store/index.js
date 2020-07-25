import React, {createContext, useMemo, useReducer} from 'react/index';
import {withRouter} from 'react-router-dom';
import {DataSet} from 'choerodon-ui/pro';
import {inject} from 'mobx-react';
import {injectIntl} from 'react-intl';
import dirNameDS from './dirNameDS';

const Store = createContext();

export default Store;

export const StoreProvider = withRouter(injectIntl(inject('AppState')(
    (props) => {
        // const { AppState: { currentMenuType: { type, id, organizationId } }, match: { params }, intl, children, modal } = props;
        const children = props;
        const dirNameDataSet = useMemo(() => new DataSet(dirNameDS()), []);
        const value = {
            ...props,
            dirNameDataSet,
        };
        return (
            <Store.Provider value={value}>
                {children}
            </Store.Provider>
        );
    },
)));
