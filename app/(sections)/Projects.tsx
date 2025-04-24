import React from 'react';
import ProjectsComponent from '../components/ProjectsComponent';
import ScrollingText from '../components/ScrollingText';

const Projects: React.FC = () => {
  return (
    <div id="projects" className="min-h-screen bg-[#dbdee3] flex flex-col items-center justify-center py-6 sm:py-10 px-2 sm:px-4 overflow-hidden">
      <div className='top-1 w-full '>
        <ScrollingText
        text='AI .. LLM || REDUX .. REACT ||'
        speed={1}
        direction='left'
        fontSize='clamp(3rem, 8vw, 6rem)'
        color='00000010'
        />
      </div>
      <ProjectsComponent />
    </div>
  );
};

export default Projects;