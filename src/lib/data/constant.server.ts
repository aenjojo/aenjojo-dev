export const isProductionMode = process.env.NODE_ENV === 'production';

export const keys = {
  cookie: {
    sesionToken: 'ssit',
  },
  cache: {
    about: 'resume:about',
    experience: 'resume:experience',
    education: 'resume:education',
    skill: 'resume:skill',
    project: 'resume:project',
  },
};
