    --virtual ~LinkPolicy() {};
    --virtual void setSrcDimensions(Dimensions& dims) = 0;
    --virtual void setDestDimensions(Dimensions& dims) = 0;
    --virtual const Dimensions& getSrcDimensions() const = 0;
    --virtual const Dimensions& getDestDimensions() const = 0;
    -- // initialization is probably unnecessary, but it lets
    -- // us do a sanity check before generating the splitter map. 
    --virtual void initialize() = 0;
    --virtual bool isInitialized() const = 0;
    --virtual void setNodeOutputElementCount(size_t elementCount) = 0;

import Types
class LinkPolicy p where
    setSrcDimensions :: Dimenssions -> p -> p
    setDestDimensions :: Dimenssions -> p -> p
    getSrcDimensions :: p -> Dimenssions 
    getDestDimensions :: p -> Dimenssions
