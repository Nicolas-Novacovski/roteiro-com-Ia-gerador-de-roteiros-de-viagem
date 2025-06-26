
import React, { useState, isValidElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import type { LiProps } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';
import {
  IconRestaurant, IconAccommodation, IconMuseum, IconCulture, IconNature,
  IconPark, IconShopping, IconFlight, IconTrain, IconBus, IconCar,
  IconWalking, IconInfo, IconTip, IconCost, IconTime, IconActivity,
  IconPhoto, IconMapPin, IconLanguage, IconLuggage, IconPassport, IconTransport
} from './icons'; 

interface DaySectionProps {
  dayTitle: string;
  dayContent: string;
  initiallyOpen?: boolean;
  isWeatherSection?: boolean;
  isPreparingPdfExport?: boolean; 
}

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  RESTAURANT: IconRestaurant,
  ACCOMMODATION: IconAccommodation,
  MUSEUM: IconMuseum,
  CULTURE: IconCulture,
  NATURE: IconNature,
  PARK: IconPark,
  SHOPPING: IconShopping,
  FLIGHT: IconFlight,
  TRAIN: IconTrain,
  BUS: IconBus,
  CAR: IconCar,
  WALKING: IconWalking,
  INFO: IconInfo,
  TIP: IconTip,
  COST: IconCost,
  TIME: IconTime,
  ACTIVITY: IconActivity,
  PHOTO: IconPhoto,
  MAP_PIN: IconMapPin,
  LANGUAGE: IconLanguage, 
  LUGGAGE: IconLuggage,   
  PASSPORT: IconPassport,
  TRANSPORT: IconTransport,
};

// Helper function to extract icon and remaining text
const getIconForMarker = (textNodeValue: string): { IconComponent: React.FC<React.SVGProps<SVGSVGElement>> | null, remainingText: string } => {
  const trimmedText = textNodeValue.trimStart(); // Process once at the beginning
  const match = trimmedText.match(/^\[ICON:\s*([A-Za-z_]+)\s*\]\s*/);
  if (match && match[1]) {
    const iconKey = match[1].trim().toUpperCase();
    const IconComponent = iconMap[iconKey] || null;
    // Ensure remainingText correctly captures text after the icon marker from the original trimmedText
    const remainingText = trimmedText.substring(match[0].length); 
    return { IconComponent, remainingText };
  }
  return { IconComponent: null, remainingText: textNodeValue }; // Return original if no match
};

// Custom Li renderer
const LiWithIconRenderer: React.FC<LiProps> = (props) => {
  const { children, node, className: originalLiClassName, ...liRest } = props;

  let iconToRender: React.ReactNode = null;
  const originalChildrenArray = React.Children.toArray(children);
  let finalChildrenArray = [...originalChildrenArray]; // Mutable copy for rendering content part

  if (originalChildrenArray.length > 0) {
    const firstChildNode = originalChildrenArray[0];
    let textContentToParse: string | null = null;
    
    if (typeof firstChildNode === 'string') {
      textContentToParse = firstChildNode;
    } else if (React.isValidElement(firstChildNode)) {
      // Assert props type for safer access
      const elementProps = firstChildNode.props as { children?: React.ReactNode; [key: string]: any };
      
      if (elementProps && elementProps.children) {
        const grandChildren = React.Children.toArray(elementProps.children);
        if (grandChildren.length > 0 && typeof grandChildren[0] === 'string') {
          textContentToParse = grandChildren[0];
        }
      }
    }

    if (textContentToParse !== null) {
      const { IconComponent, remainingText } = getIconForMarker(textContentToParse);
      
      if (IconComponent) {
        iconToRender = <IconComponent className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-slate-600 dark:text-slate-400" />;
        
        if (typeof firstChildNode === 'string') {
          if (remainingText.trim() === '') {
            finalChildrenArray.shift(); 
          } else {
            finalChildrenArray[0] = remainingText;
          }
        } else if (React.isValidElement(firstChildNode)) {
          const firstElement = firstChildNode; // Already known to be a ReactElement
          const { children: originalElementChildren, ...otherProps } = firstElement.props; 

          // Use originalElementChildren which came from firstElement.props
          const originalGrandChildren = React.Children.toArray(originalElementChildren);
          let newGrandChildren: React.ReactNode[] = [];

          if (originalGrandChildren.length > 0 && typeof originalGrandChildren[0] === 'string') {
            if (remainingText.trim() !== '') {
              newGrandChildren.push(remainingText);
            }
            newGrandChildren.push(...originalGrandChildren.slice(1));
          } else {
             // Fallback or if originalGrandChildren[0] was not the text source (should be rare if textContentToParse was found)
             if (remainingText.trim() === '') {
                newGrandChildren = originalGrandChildren.slice(1);
            } else {
                newGrandChildren = [remainingText, ...originalGrandChildren.slice(1)];
            }
          }
          
          const isSimpleWrapper = typeof firstElement.type === 'string' &&
                                  ['em', 'strong', 'span', 'p', 'a'].includes(firstElement.type.toLowerCase());
          
          if (newGrandChildren.length === 0 && isSimpleWrapper && Object.keys(otherProps).length === 0) {
            finalChildrenArray.shift();
          } else {
            // Spread otherProps (which is a confirmed object) and set new children
            finalChildrenArray[0] = React.cloneElement(
              firstElement,
              { ...otherProps, children: newGrandChildren.length > 0 ? newGrandChildren : undefined }
            );
          }
        }
      }
    }
  }

  if (iconToRender) {
    return (
      <li {...liRest} className={`flex items-start ${originalLiClassName || ''}`}>
        {iconToRender}
        <span className="flex-grow">{finalChildrenArray.length > 0 ? finalChildrenArray : null}</span>
      </li>
    );
  }

  return <li {...props}>{children}</li>; // Render original if no icon found/processed
};


const DaySection: React.FC<DaySectionProps> = ({ dayTitle, dayContent, initiallyOpen = false, isWeatherSection = false, isPreparingPdfExport }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  let displayTitle = dayTitle.replace(/^##\s*/, '').trim();
  let TitleIconComponent: React.FC<React.SVGProps<SVGSVGElement>> | null = null;

  const titleIconMatch = displayTitle.match(/^\[ICON:\s*([A-Za-z_]+)\s*\]\s*(.*)/i);
  if (titleIconMatch && titleIconMatch[1]) {
      const titleIconKey = titleIconMatch[1].trim().toUpperCase();
      if (iconMap[titleIconKey]) {
        TitleIconComponent = iconMap[titleIconKey];
        displayTitle = titleIconMatch[2] ? titleIconMatch[2].trim() : '';
      }
  }
  
  const contentId = `section-content-${displayTitle.replace(/\s+/g, '-').toLowerCase()}`;

  let titleColorClass = 'text-blue-600 dark:text-blue-400'; 
  let borderColorClass = 'border-slate-200 dark:border-slate-700';
  let wrapperClassModifier = 'day-section-wrapper'; 

  const lowerCaseDisplayTitle = displayTitle.toLowerCase(); 

  if (isWeatherSection || lowerCaseDisplayTitle.includes("clima") || lowerCaseDisplayTitle.includes("custos") || lowerCaseDisplayTitle.includes("orçamento")) {
    titleColorClass = 'text-purple-600 dark:text-purple-400';
    borderColorClass = 'border-purple-200 dark:border-purple-700';
    wrapperClassModifier = 'weather-section-wrapper';
  } else if (TitleIconComponent === IconLanguage || lowerCaseDisplayTitle.includes("dicas de idioma") || lowerCaseDisplayTitle.includes("frases úteis")) {
    titleColorClass = 'text-teal-600 dark:text-teal-400'; 
    borderColorClass = 'border-teal-200 dark:border-teal-700';
    wrapperClassModifier = 'language-section-wrapper';
    if (!TitleIconComponent) TitleIconComponent = IconLanguage;
  } else if (TitleIconComponent === IconPassport || lowerCaseDisplayTitle.includes("documentos necessários") || lowerCaseDisplayTitle.includes("vistos")) {
    titleColorClass = 'text-sky-600 dark:text-sky-400'; 
    borderColorClass = 'border-sky-200 dark:border-sky-700';
    wrapperClassModifier = 'documents-section-wrapper';
    if (!TitleIconComponent) TitleIconComponent = IconPassport;
  }
  
  const contentShouldBeVisible = isOpen || !!isPreparingPdfExport;


  return (
    <div className={`${wrapperClassModifier} mb-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg transition-all duration-300 ease-in-out`}>
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-4 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        aria-expanded={contentShouldBeVisible}
        aria-controls={contentId}
      >
        <h2 className={`text-xl sm:text-2xl font-bold ${titleColorClass} flex items-center`}>
          {TitleIconComponent && <TitleIconComponent className="h-6 w-6 mr-2 flex-shrink-0" />}
          {displayTitle}
        </h2>
        <span className={`${titleColorClass} opacity-75 transform transition-transform duration-200 ${contentShouldBeVisible ? 'rotate-180' : ''}`}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
           </svg>
        </span>
      </button>
      <div
        id={contentId}
        className={`p-4 sm:p-6 border-t ${borderColorClass} ${!contentShouldBeVisible ? 'hidden' : ''}`}
      >
        <article className={`prose prose-slate dark:prose-invert max-w-none
                              prose-headings:font-semibold
                              prose-h2:${titleColorClass} 
                              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:border-b prose-h3:border-slate-300 dark:prose-h3:border-slate-600 prose-h3:pb-1.5
                              prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-a:break-words
                              prose-strong:text-slate-800 dark:prose-strong:text-slate-100
                              prose-ul:list-disc prose-ul:pl-1 prose-ul:space-y-1.5 
                              prose-ol:list-decimal prose-ol:pl-1 prose-ol:space-y-1.5
                              prose-li:my-1 prose-li:leading-relaxed prose-li:[break-inside:avoid-page] 
                              prose-p:leading-relaxed prose-p:mb-3 prose-p:[break-inside:avoid-page]
                              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:[break-inside:avoid-page]
                              prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              li: LiWithIconRenderer,
            }}
          >
            {dayContent.replace(/^## .*\n?/, '')}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default DaySection;
