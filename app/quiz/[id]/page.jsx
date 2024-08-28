/**
 * Renders a Next.js page component that displays a quiz question and its answer options.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.params - The parameters passed to the page component.
 * @param {string} props.params.id - The ID of the quiz question.
 * @returns {JSX.Element} The rendered page component.
 */

import { Container } from '@/components';
import { Answer } from '@/components/Answer';
import { getQuizQuestion } from '@/lib/quiz'; // Import the getQuizQuestion function

export default async function Page({ params }) {
  try {
    const question = await getQuizQuestion(params.id);

    if (!question) {
      return (
        <Container as="main" className="flex flex-col gap-5 py-5">
          <h1 className="text-lg font-semibold">Quiz question not found</h1>
        </Container>
      );
    }

    return (
      <Container as="main" className="flex flex-col gap-5 py-5">
        <h1 className="text-lg font-semibold">{question.title}</h1>
        <Answer answers={question.answers} questionId={params.id} />
      </Container>
    );
  } catch (error) {
    return (
      <Container as="main" className="flex flex-col gap-5 py-5">
        <h1 className="text-lg font-semibold">Internal Server Error</h1>
      </Container>
    );
  }
}
