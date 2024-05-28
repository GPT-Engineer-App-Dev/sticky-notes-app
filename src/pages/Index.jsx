import { useState } from "react";
import { Box, Container, VStack, HStack, Input, Textarea, Button, Heading, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const toast = useToast();

  const handleAddNote = () => {
    if (title.trim() === "" || body.trim() === "") {
      toast({
        title: "Error",
        description: "Title and body cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newNote = { title, body };
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }
    setTitle("");
    setBody("");
  };

  const handleEditNote = (index) => {
    setTitle(notes[index].title);
    setBody(notes[index].body);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Heading as="h1" mb={4} textAlign="center">Note Taking App</Heading>
      <VStack spacing={4} mb={8}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={handleAddNote} colorScheme="teal" width="full">
          {editIndex !== null ? "Update Note" : "Add Note"}
        </Button>
      </VStack>
      <VStack spacing={4}>
        {notes.map((note, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="full">
            <HStack justifyContent="space-between">
              <Box>
                <Heading as="h3" size="md">{note.title}</Heading>
                <Box>{note.body}</Box>
              </Box>
              <HStack spacing={2}>
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Edit Note"
                  onClick={() => handleEditNote(index)}
                />
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Delete Note"
                  onClick={() => handleDeleteNote(index)}
                />
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;