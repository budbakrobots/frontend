import { useCallback, useEffect, useState } from "react";

// => Tiptap packages
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Image from "@tiptap/extension-image";
import Heading, { Level } from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import { FaTrashAlt } from "react-icons/fa";

import * as Icons from "./icons";
import Button from "./button";
import { useAtom } from "jotai";
import { global_session, global_supabase } from "~/store";
import { useNavigate } from "@remix-run/react";

export function EditEditor({ blog }: any) {
  const supabase = useAtom(global_supabase)[0];
  const session = useAtom(global_session)[0];
  const navigate = useNavigate();
  const [heroImage, setHeroImage] = useState("");
  const [title, setTitle] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (blog.heroImage) setHeroImage(blog.heroImage);
    if (blog.title) setTitle(blog.title);
  }, []);
  const editor = useEditor({
    content: blog.content,
    autofocus: true,
    immediatelyRender: false,
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
      Heading,
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "my-custom-image-class",
        },
      }),
    ],
  }) as Editor;

  function convertImageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const base64String = event.target.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleHeading = useCallback(
    (level: Level) => {
      editor.chain().focus().toggleHeading({ level }).run();
    },
    [editor]
  );

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const options: any[] = [
    {
      label: <Icons.RotateLeft />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
    },
    {
      label: <Icons.RotateRight />,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
    },
    {
      label: <Icons.Bold />,
      onClick: toggleBold,
      active: editor.isActive("bold"),
    },
    {
      label: <Icons.Underline />,
      onCLick: toggleUnderline,
      active: editor.isActive("underline"),
    },
    {
      label: <Icons.Italic />,
      onCLick: toggleItalic,
      active: editor.isActive("intalic"),
    },
    {
      label: <Icons.Strikethrough />,
      onClick: toggleStrike,
      active: editor.isActive("strike"),
    },
    {
      label: <Icons.Code />,
      onClick: toggleCode,
      active: editor.isActive("code"),
    },
    {
      label: "H1",
      onClick: () => {
        toggleHeading(1);
      },
      active: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "H2",
      onClick: () => {
        toggleHeading(2);
      },
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "H3",
      onClick: () => {
        toggleHeading(3);
      },
      active: editor.isActive("heading", { level: 3 }),
    },
    {
      label: "H4",
      onClick: () => {
        toggleHeading(4);
      },
      active: editor.isActive("heading", { level: 4 }),
    },
    {
      label: "H5",
      onClick: () => {
        toggleHeading(5);
      },
      active: editor.isActive("heading", { level: 5 }),
    },
    {
      file: true,
      label: "add Image from System",
      onChange: async (e: any) => {
        console.log(e);
        const filebase64: any = await convertImageToBase64(e.target.files[0]);
        editor.chain().focus().setImage({ src: filebase64 }).run();
      },
    },
    {
      label: "add Image by URI",
      onClick: () => {
        addImage();
      },
    },
  ];

  const handleClick = async () => {
    if (!supabase) return;
    const content = await editor.getHTML();
    let dataToInsert: any = {
      title: title,
      // heroImage,
      content,
    };
    if (heroImage) {
      dataToInsert = { ...dataToInsert, heroImage };
    }

    const { data, error } = await supabase
      .from("blogs")
      .update(dataToInsert)
      .eq("id", blog.id)
      .select();

    if (error) {
      console.error("Error updating blog:", error);
    } else {
      console.log("Updated blog:");
      navigate("/");
    }
  };
  // const handleClick = async () => {
  //   setError(null);
  //   setResult(null);
  //   try {
  //     const content=await editor.getHTML()
  //     const data:any = await fetcher.submit(
  //       { content}, // Data to send to the action
  //       { method: "post", action: "/api/blog/create" } // Replace with your route
  //     );
  //     if (data?.errors) {
  //       setError(data.errors.name)
  //     } else if(data?.message){
  //       setResult(data.message)
  //     }
  //   } catch (e: any) {
  //       setError(e.message)
  //   }
  // };

  return (
    <div className="border-2 border-red-400 row-span-10 col-span-12 grid grid-rows-12 grid-cols-12">
      <div className="col-span-12 row-span-1 flex items-center">
        <div className="col-span-12 row-span-1 flex w-full items-center justify-between px-2">
          <h1>Update Blog</h1>
          <div className="w-20">
            <Button active={true} onClick={handleClick}>
              Update
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-12 row-span-3 grid grid-cols-12 grid-rows-12 p-4 gap-4">
        <div className=" col-start-2 col-span-10 row-span-4">
          <input
            placeholder="TITLE "
            className="w-full h-full rounded-lg border-0 bg-gray-700 px-2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="relative w-full bg-slate-700 col-start-2 col-span-10 row-span-7 flex items-center justify-center rounded-lg gap-4 flex-col overflow-hidden">
          {heroImage ? (
            <>
              <img src={heroImage} className="w-full h-full object-cover" />
              <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                HeroImage
              </h1>

              <div className="w-10 h-10 absolute top-2 right-2">
                <Button
                  onClick={() => {
                    setHeroImage("");
                  }}
                  active={true}
                >
                  <FaTrashAlt color="#ffffff" size={50} />
                </Button>
              </div>
            </>
          ) : (
            <Button
              onChange={async (e: any) => {
                console.log(e);
                const filebase64: any = await convertImageToBase64(
                  e.target.files[0]
                );
                setHeroImage(filebase64);
              }}
              active={true}
              file={true}
            >
              upload Hero Image
            </Button>
          )}
        </div>
      </div>
      <div className="col-span-12 row-span-8 grid grid-cols-12 grid-rows-12 px-8">
        <div className="col-span-12 row-span-4 flex w-full gap-2 p-2 flex-wrap">
          {options.map((option, idx) => (
            <div className="flex" key={`textEditor_${idx}`}>
              <Button {...option}>{option.label}</Button>
            </div>
          ))}
        </div>
        <EditorContent
          editor={editor}
          className="p-2 bg-gray-700 row-span-8 col-span-12 rounded-lg border-2 border-white overflow-x-hidden h-full"
          onClick={() => {
            editor.commands.focus();
          }}
        />
      </div>
    </div>
  );
}
