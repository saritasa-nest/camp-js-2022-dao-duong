import { AnimeSort, AnimeType } from '@js-camp/core/models/anime/anime';
import { Box, Tabs, Tab } from '@mui/material';
import { FC, memo, SyntheticEvent, useState, useEffect } from 'react';
import { AnimeListQueryParamsWithId } from '@js-camp/core/models/anime-query-params';

import { Search } from './components/Search/Search';
import { Sort } from './components/Sort/Sort';
import { Type } from './components/Type/Type';
import styles from './AnimeListControl.module.css';

interface AnimeListControlProps {

  /** Params value. */
  readonly queryParams: AnimeListQueryParamsWithId;

  /** Set params callback. */
  readonly setQueryParams: (params: AnimeListQueryParamsWithId) => void;
}

interface TabPanelProps {

  /** Tab children. */
  readonly children?: React.ReactNode;

  /** Tab index. */
  readonly index: number;

  /** Tab value. */
  readonly value: number;
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
      {value === index && <Box sx={{ p: 2, display: 'flex' }}>{children}</Box>}
    </div>
  );
};

const AnimeListControlComponent: FC<AnimeListControlProps> = ({
  queryParams,
  setQueryParams,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [sortValue, setSortValue] = useState<AnimeSort>(queryParams.sort);
  const [typeFilterValue, setTypeFilterValue] = useState<readonly AnimeType[]>(
    queryParams.type,
  );
  const [searchValue, setSearchValue] = useState<string>(queryParams.search);
  const handleTabChange = (event: SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      sort: sortValue,
      type: typeFilterValue,
      search: searchValue,
    });
  }, [sortValue, typeFilterValue, searchValue]);

  return (
    <Box className={styles['anime-list-controls']}>
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="anime control tabs"
          className={styles['tabs-container']}
        >
          <Tab label="Sort" className={styles['tab-item']} />
          <Tab label="Type" className={styles['tab-item']} />
          <Tab label="Search" className={styles['tab-item']} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Type typeValue={typeFilterValue} setTypeValue={setTypeFilterValue} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </TabPanel>
    </Box>
  );
};

export const AnimeListControl = memo(AnimeListControlComponent);
