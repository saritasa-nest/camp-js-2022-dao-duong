import { FC, memo } from 'react';

import styles from './EditPage.module.css';

const EditPageComponent: FC = () => {
  return (
    <div>This is edit page!</div>
  )
}

export const EditPage = memo(EditPageComponent);
