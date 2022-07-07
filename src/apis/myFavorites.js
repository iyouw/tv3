import request from './transport.js';

/**
 * get my favorite file list with name, type and updatetime range filters
 * @param { Number } page
 * @param { Number} pageSize
 * @param { String } name
 * @param { Number } type
 * @param { String } updateStartTime
 * @param { String } updateEndTime
 */
export function getMyFavoriteFileListAsync(
  page,
  pageSize,
  name,
  type,
  updateStartTime,
  updateEndTime,
) {
  const url = 'collection/page';
  const method = 'POST';
  const data = {
    page,
    pageSize,
    name,
    type,
    updateTime: {
      start: updateStartTime,
      end: updateEndTime,
    },
  };
  return request({
    url,
    method,
    data,
  });
}

/**
 * add the specific files to my favorite list
 * @param { Array<String> } resourceIds
 */
export function addMyFavoriteFileAsync(resourceIds) {
  const url = 'collection/add';
  const method = 'POST';
  const data = {
    resIds: resourceIds,
  };
  return request({
    url,
    method,
    data,
  });
}

/**
 * remove the specific favorite file records
 * @param { Array<String> } resourceIds
 */
export function removeMyFavoriteFileAsync(resourceIds) {
  const url = 'collection/remove';
  const method = 'POST';
  const data = {
    resIds: resourceIds,
  };
  return request({
    url,
    method,
    data,
  });
}
