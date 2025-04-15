import { IResponse, ResourceTypes } from '@/types';
import { ICommentPayload } from '@/types/comment';
import fetcher from '@/utils/fetcher';

export const sendComment = async (data: ICommentPayload) => {
  const { type, ...rest } = data;

  const payload = {
    ...rest,
    type: ResourceTypes[type],
  };

  return fetcher<ICommentPayload, IResponse>('/comment', {
    method: 'POST',
    params: {
      timestamp: Date.now(),
    },
    data: payload,
  });
};
