import { AnimeSort, AnimeSortDirection, AnimeSortField, AnimeType } from '@js-camp/core/models/anime/anime';
import { Box, Tabs, Tab } from '@mui/material';
import { FC, memo, SyntheticEvent, useState } from 'react';

import styles from './AnimeListControl.module.css';
import { Sort } from './components/Sort/Sort';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AnimeListControlComponent: FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [sortValue, setSortValue] = useState<AnimeSort>({
    direction: AnimeSortDirection.Descending,
    field: AnimeSortField.EnglishTitle,
  });
  const [filterValue, setFilterValue] = useState<AnimeType | []>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const handleTabChange = (event: SyntheticEvent, newTabValue: number) => {
    setTabValue(tabValue);
  };

  return (
    <Box className={styles['anime-list-control']}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="anime control tabs" sx={{ width: '100%' }}>
          <Tab label="Sort" sx={{ flex: '1' }}/>
          <Tab label="Type" sx={{ flex: '1' }}/>
          <Tab label="Search" sx={{ flex: '1' }}/>
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Sort sortValue={sortValue} setSortValue={setSortValue}/>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export const AnimeListControl = memo(AnimeListControlComponent);
