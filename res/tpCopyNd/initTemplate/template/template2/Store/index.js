import React, {createContext, useMemo, useReducer} from 'react/index';
import {withRouter} from 'react-router-dom';
import {DataSet} from 'choerodon-ui/pro';
import {inject} from 'mobx-react';
import {injectIntl} from 'react-intl';
import _xxxName_DS from './_xxxName_DS';

const Store = createContext();

export default Store;

export const StoreProvider = withRouter(injectIntl(inject('AppState')(
    (props) => {
        // const { AppState: { currentMenuType: { type, id, organizationId } }, match: { params }, intl, children, modal } = props;
        const children = props;
        const _xxxName_DataSet = useMemo(() => new DataSet(_xxxName_DS()), []);
        const value = {
            ...props,
            _xxxName_DataSet,
        };
        return (
            <Store.Provider value={value}>
                {children}
            </Store.Provider>
        );
    },
)));
