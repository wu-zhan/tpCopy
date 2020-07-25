import React from 'react';
import {StoreProvider} from './Store';
import dirName from './dirName';

const Index = (props) => (
    <StoreProvider {...props}>
        <dirName/>
    </StoreProvider>
);

export default Index;
