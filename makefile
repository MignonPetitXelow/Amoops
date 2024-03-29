SRC = $(shell find server/ -type f -name '*.go')

CCL = go
CCW = go.exe
OUTPUT = "amoops"

all: $(NAME)

$(NAME):
	${CCW} build -o $(OUTPUT) -buildmode=exe -a -v $(SRC)

run: $(NAME)
	$(OUTPUT)

clean:
	rm $(OUTPUT)