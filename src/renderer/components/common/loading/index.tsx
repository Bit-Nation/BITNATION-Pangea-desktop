import * as React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const BackDropLoading = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    vertical-align: middle;
    padding-top: 20%;
    display: ${props => (props.isLoading ? 'block' : 'none')};
    z-index: 9999;
`;

interface ILoadingProps {
    isLoading: boolean;
}
const Loading = ({ isLoading }: ILoadingProps) => (
    <BackDropLoading isLoading={isLoading}>
        <CircularProgress color="secondary" />
    </BackDropLoading>
);
export default Loading;
