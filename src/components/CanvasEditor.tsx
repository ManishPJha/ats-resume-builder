/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';

// import { Html } from 'react-konva-utils';

const CanvasEditor = () => {
  const [texts, setTexts] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stageRef = useRef<any>(null);

  // Add a new text box
  const addText = () => {
    const newText = {
      id: `text-${Date.now()}`,
      x: 50,
      y: 50,
      text: 'Edit me',
      fontSize: 20,
      fill: 'black',
      draggable: true,
    };
    setTexts([...texts, newText]);
  };

  // Add a new image
  const addImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const newImage = {
          id: `image-${Date.now()}`,
          x: 50,
          y: 50,
          image: img,
          width: img.width,
          height: img.height,
          draggable: true,
        };
        setImages([...images, newImage]);
      };
    };
    reader.readAsDataURL(file);
  };

  // Handle text changes
  const handleTextChange = (id: string, newText: string) => {
    setTexts(
      texts.map((text) => (text.id === id ? { ...text, text: newText } : text))
    );
  };

  // Handle text styling
  const handleStyleChange = (id: string, style: any) => {
    setTexts(
      texts.map((text) => (text.id === id ? { ...text, ...style } : text))
    );
  };

  // Handle selection
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Toolbar */}
      <div className="flex space-x-4">
        <button
          onClick={addText}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Add Text
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              addImage(e.target.files[0]);
            }
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        />
      </div>

      {/* Canvas */}
      <Stage
        width={800}
        height={600}
        ref={stageRef}
        className="bg-white shadow-lg"
      >
        <Layer>
          {/* Render texts */}
          {texts.map((text) => (
            <Text
              key={text.id}
              x={text.x}
              y={text.y}
              text={text.text}
              fontSize={text.fontSize}
              fill={text.fill}
              draggable={text.draggable}
              onDragEnd={(e) => {
                setTexts(
                  texts.map((t) =>
                    t.id === text.id
                      ? { ...t, x: e.target.x(), y: e.target.y() }
                      : t
                  )
                );
              }}
              onClick={() => handleSelect(text.id)}
            />
          ))}

          {/* Render images */}
          {images.map((image) => (
            <Image
              key={image.id}
              x={image.x}
              y={image.y}
              image={image.image}
              width={image.width}
              height={image.height}
              draggable={image.draggable}
              onDragEnd={(e) => {
                setImages(
                  images.map((img) =>
                    img.id === image.id
                      ? { ...img, x: e.target.x(), y: e.target.y() }
                      : img
                  )
                );
              }}
              onClick={() => handleSelect(image.id)}
            />
          ))}
        </Layer>
      </Stage>

      {/* Style Editor */}
      {selectedId && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Edit Selected Element</h3>
          {texts.find((text) => text.id === selectedId) && (
            <>
              <input
                type="text"
                value={texts.find((text) => text.id === selectedId).text}
                onChange={(e) => handleTextChange(selectedId, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="number"
                value={texts.find((text) => text.id === selectedId).fontSize}
                onChange={(e) =>
                  handleStyleChange(selectedId, {
                    fontSize: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="color"
                value={texts.find((text) => text.id === selectedId).fill}
                onChange={(e) =>
                  handleStyleChange(selectedId, { fill: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CanvasEditor;
