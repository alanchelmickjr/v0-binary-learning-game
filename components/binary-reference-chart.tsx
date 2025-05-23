import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BinaryReferenceChart() {
  // ASCII chart for uppercase letters
  const uppercaseLetters = Array.from({ length: 26 }, (_, i) => {
    const char = String.fromCharCode(65 + i)
    const binary = (65 + i).toString(2).padStart(8, "0")
    return { char, binary }
  })

  // ASCII chart for lowercase letters
  const lowercaseLetters = Array.from({ length: 26 }, (_, i) => {
    const char = String.fromCharCode(97 + i)
    const binary = (97 + i).toString(2).padStart(8, "0")
    return { char, binary }
  })

  // ASCII chart for numbers
  const numbers = Array.from({ length: 10 }, (_, i) => {
    const char = String(i)
    const binary = (48 + i).toString(2).padStart(8, "0")
    return { char, binary }
  })

  // ASCII chart for common symbols
  const symbols = [
    { char: "Space", binary: "00100000" },
    { char: "!", binary: "00100001" },
    { char: "?", binary: "00111111" },
    { char: ".", binary: "00101110" },
    { char: ",", binary: "00101100" },
    { char: "-", binary: "00101101" },
    { char: "_", binary: "01011111" },
    { char: "@", binary: "01000000" },
    { char: "#", binary: "00100011" },
    { char: "$", binary: "00100100" },
  ]

  // Split the arrays into columns for more compact display
  const splitIntoColumns = (arr, columns) => {
    const result = []
    const itemsPerColumn = Math.ceil(arr.length / columns)

    for (let i = 0; i < columns; i++) {
      result.push(arr.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn))
    }

    return result
  }

  const uppercaseColumns = splitIntoColumns(uppercaseLetters, 3)
  const lowercaseColumns = splitIntoColumns(lowercaseLetters, 3)
  const numbersAndSymbols = [...numbers, ...symbols]
  const numbersAndSymbolsColumns = splitIntoColumns(numbersAndSymbols, 2)

  return (
    <Tabs defaultValue="uppercase" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="uppercase">Uppercase</TabsTrigger>
        <TabsTrigger value="lowercase">Lowercase</TabsTrigger>
        <TabsTrigger value="numbers">Numbers & Symbols</TabsTrigger>
      </TabsList>

      <TabsContent value="uppercase">
        <div className="flex gap-2 overflow-auto max-h-[300px] p-1">
          {uppercaseColumns.map((column, colIndex) => (
            <div key={`uppercase-col-${colIndex}`} className="flex-1 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Char</TableHead>
                    <TableHead>Binary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {column.map(({ char, binary }) => (
                    <TableRow key={`uppercase-${char}`}>
                      <TableCell className="font-medium text-center">{char}</TableCell>
                      <TableCell className="font-mono text-xs">{binary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="lowercase">
        <div className="flex gap-2 overflow-auto max-h-[300px] p-1">
          {lowercaseColumns.map((column, colIndex) => (
            <div key={`lowercase-col-${colIndex}`} className="flex-1 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Char</TableHead>
                    <TableHead>Binary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {column.map(({ char, binary }) => (
                    <TableRow key={`lowercase-${char}`}>
                      <TableCell className="font-medium text-center">{char}</TableCell>
                      <TableCell className="font-mono text-xs">{binary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="numbers">
        <div className="flex gap-2 overflow-auto max-h-[300px] p-1">
          {numbersAndSymbolsColumns.map((column, colIndex) => (
            <div key={`numbers-col-${colIndex}`} className="flex-1 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Char</TableHead>
                    <TableHead>Binary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {column.map(({ char, binary }) => (
                    <TableRow key={`numbers-${char}`}>
                      <TableCell className="font-medium text-center">{char}</TableCell>
                      <TableCell className="font-mono text-xs">{binary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
