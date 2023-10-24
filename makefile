export CGO_ENABLED=0
SRC = $(shell find server/ -type f -name '*.go')

CCW = "/mnt/c/Program Files/Go/bin/go.exe"
FLAGS = "-ldflags "-w" -ldflags "-s" -gcflags "all=-N -l" -buildmode=exe -a -v"
OUTPUT = "./bin/server"

all: $(NAME)

$(NAME):
	${CCW} build -o $(OUTPUT) $(FLAGS) $(SRC)