LATEXMK ?= latexmk
PDFINFO ?= pdfinfo
PDFTOTEXT ?= pdftotext
RG ?= rg

.PHONY: pdf check clean

pdf:
	$(LATEXMK) -pdf -shell-escape -interaction=nonstopmode -halt-on-error -file-line-error -outdir=build ZYAL.tex
	cp build/ZYAL.pdf ZYAL.pdf

check: pdf
	test -f ZYAL.pdf
	pages="$$( $(PDFINFO) ZYAL.pdf | awk '/^Pages:/ {print $$2}' )"; \
	  test "$$pages" -ge 8 -a "$$pages" -le 20
	$(PDFTOTEXT) ZYAL.pdf - | $(RG) "ZYAL|LangGraph|OpenHands|Hermes|References|Appendix" >/dev/null
	! $(RG) -n "TODO|PLACEHOLDER|citation needed|\\?\\?|overclaim" ZYAL.tex ZYAL.bib Makefile research figures listings
	cd ../packages/jekko && bun test src/agent-script/parser.test.ts

clean:
	$(LATEXMK) -C -outdir=build ZYAL.tex || true
	rm -rf build _minted-ZYAL ZYAL.pdf
