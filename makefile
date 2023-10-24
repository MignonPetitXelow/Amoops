export CGO_ENABLED=0
SRC = $(shell find server/ -type f -name '*.go')

CCW = "/mnt/c/Program Files/Go/bin/go.exe"

all: $(NAME)

$(NAME):
	${CCW} build -o ./bin/server -ldflags "-w" -ldflags "-s" -gcflags "all=-N -l" -buildmode=exe -a -v $(SRC)