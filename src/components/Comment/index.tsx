import { Avatar, Button, Skeleton } from 'antd';
import React from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { IUser } from '../../types/user';

interface Props {}

interface IComment {
  content: string;
  commentId: number;
  user: IUser;
}

const Comment: React.FC<Props> = () => {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      const url = `comment/new?type=0&id=28815381&sortType=3&pageSize=20&pageNo=${
        pageIndex + 1
      }`;

      if (pageIndex === 0) return url;

      const cursor = previousPageData?.comments?.pop().time;

      return `${url}&cursor=${cursor}`;
    }
  );

  console.log(data, size);

  if (!data?.[0]) {
    return <Skeleton />;
  }

  return (
    <div>
      {data.map((item) =>
        item.comments.map(({ content, commentId, user }: IComment) => (
          <div key={commentId}>
            <div>
              <Avatar src={user.avatarUrl} />
              {user.nickname}
            </div>
            <div>{content}</div>
          </div>
        ))
      )}
      <Button
        onClick={() => {
          setSize(size + 1);
        }}
      >
        Load More
      </Button>
    </div>
  );
};

export default Comment;
