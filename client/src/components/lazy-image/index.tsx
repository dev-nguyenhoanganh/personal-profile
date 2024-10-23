import { useState, CSSProperties } from 'react';
import { Box } from '@mui/material';

const fallBack = (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    sx={{
      svg: {
        width: '60%',
        '& *': {
          width: '100%',
          height: '100%',
        },
      },
    }}>
    <svg viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62 44H54L52.59 42.59C52.21 42.21 51.7 42 51.17 42H46C44.9 42 44.01 42.9 44.01 44L44 56C44 57.1 44.9 58 46 58H62C63.1 58 64 57.1 64 56V46C64 44.9 63.1 44 62 44ZM41 46C40.45 46 40 46.45 40 47V51H40.01L40 60C40 61.1 40.9 62 42 62H59C59.55 62 60 61.55 60 61C60 60.45 59.55 60 59 60H43C42.45 60 42 59.55 42 59V47C42 46.45 41.55 46 41 46ZM51.1098 49.52L47.5998 54.2C47.3498 54.53 47.5898 55 47.9998 54.99H59.9898C60.3998 54.99 60.6398 54.51 60.3798 54.18L57.8898 50.98C57.6898 50.73 57.3098 50.72 57.1098 50.97L55.0098 53.5L51.9098 49.51C51.6998 49.25 51.3098 49.26 51.1098 49.52Z"
        fill="#99CABB"
      />
    </svg>
  </Box>
);

interface ImageProps {
  src: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
}

const LazyImage = ({ src, alt, style, className }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box className={`img ${className}`}>
      {!loaded && fallBack}
      <img
        alt={alt}
        src={src}
        style={{ ...style, ...(!loaded && { display: 'none' }) }}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
};

export default LazyImage;
