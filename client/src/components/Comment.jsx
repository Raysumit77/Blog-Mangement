import { DiscussionEmbed } from "disqus-react";

export const Comment = ({ url, slug, title }) => {
  return (
    <>
      <DiscussionEmbed
        shortname={slug}
        config={{
          url,
          identifier: slug,
          title,
          language: "en_US", //e.g. for Traditional Chinese (Taiwan)
        }}
      />
    </>
  );
};